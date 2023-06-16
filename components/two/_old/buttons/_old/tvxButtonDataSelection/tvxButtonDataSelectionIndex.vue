<template>
  <span ref="target">
    <button-group
      v-if="props.buttonSite === 'left' && (!isOutside || dialogIsVisible)"
      :id="rowId"
      :datatable="props.datatable"
      :form="props.form"
      :text-new="props.textNew"
      :text-edit="props.textEdit"
      :text-delete="props.textDelete"
      :summary="summary"
      @status:dialog="dialogIsVisible = $event"
      @done:action="newDatasetCreated"
    />
    <name-element
      :id="rowId"
      :datatable="props.datatable"
      :summary="summary"
      :text-no-data="props.textNoData"
      :text-click-for-more="props.textClickForMore"
      :tooltip="props.tooltip"
      @on:dataset-selected="onDatasetSelected"
    />
    <button-group
      v-if="props.buttonSite === 'right' && (!isOutside || dialogIsVisible)"
      :id="rowId"
      :datatable="props.datatable"
      :form="props.form"
      :text-new="props.textNew"
      :text-edit="props.textEdit"
      :text-delete="props.textDelete"
      :summary="summary"
      @status:dialog="dialogIsVisible = $event"
      @done:action="newDatasetCreated"
    />
  </span>
  <dialog
    :id="rowId"
    :form="props.form"
    :text-choose="props.textChoose"
    :datatable="props.datatable"
    :is-visible="dialogIsVisible"
  />
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import {useMouseInElement} from '@vueuse/core'
import crud from "src/app/crud";

import buttonGroup from "components/buttons/_old/buttonDataSelection/buttonGroup.vue";
import NameElement from "components/buttons/_old/buttonDataSelection/nameElement.vue";
import dialog from 'components/buttons/_old/buttonDataSelection/dialogDataSelection.vue'

const props = defineProps({
  datatable: {type: String, required: true},
  id: {type: Number, required: false, default: null},
  form: {type: String, required: true},
  buttonSite: {type: String, required: false, default: 'right'},
  textNoData: {type: String, required: false, default: 'Keine Daten vorhanden! Erstelle welche!'},
  textClickForMore: {type: String, required: false, default: 'Klicken, um weitere Datensätze anzuzeigen'},
  textNew: {type: String, required: false, default: 'Neu'},
  textEdit: {type: String, required: false, default: 'Bearbeiten'},
  textDelete: {type: String, required: false, default: 'Löschen'},
  textChoose: {type: String, required: false, default: 'Bitte wählen'},
})

const emits = defineEmits(['on:datasetSelected', 'done:action'])

const summary = ref('')
const rowId = ref(0)
const target = ref(null)
const {isOutside} = useMouseInElement(target)
const dialogIsVisible = ref(false)

watch(() => props.id, (newId) => {
  load(newId)
})

const onDatasetSelected = async(id) => {
  await load(id)
  alert('Jkjklsjdf')
  emits('on:datasetSelected', id)
}

const newDatasetCreated = (id) => {
  emits('done:action', id)
  load(id)
}

const load = async (id = null) => {
  let data = null
  if (id != null) {
    data = await crud.r({table: props.datatable, id: id})
  } else {
    data = await crud.r({table: props.datatable, getFirst: true})

  }

  console.log(data.id)

  summary.value = data.summary
  rowId.value = data.id
}

onMounted(async () => {
  await load()
})
</script>
