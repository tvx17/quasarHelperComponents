<template>
  <span v-if="props.summary.length === 0 && dataCount === 0">
    <span>Keine Daten vorhanden</span>
  </span>
  <span v-if="dataCount === 1">
    <span>{{ props.summary }}</span>
  </span>
  <span v-if="dataCount > 1">
    <q-btn
      :label="(summary.length > 1 ? summary : props.textNoData)"
      dense
      flat
      @click="selectNewDataset"
    >
      <q-tooltip v-if="dataCount > 0">
          {{ props.tooltip }}
        </q-tooltip>
    </q-btn>
  </span>
  <dialog-datatable-selection
    :id="props.id"
    :datatable="props.datatable"
    :form="props.form"
    :is-visible="dialogIsVisible"
    @on:dataset-selected="onDatasetSelected"
    @on:close="dialogIsVisible = false"
  />
</template>
<script setup>
import {onMounted, ref} from "vue";


import requests from "src/app/requests";
import DialogDatatableSelection from "components/buttons/_old/buttonDataSelection/dialogDataSelection.vue";

const props = defineProps({
  datatable: {type: String, required: true, default: null},
  summary: {type: String, required: true, default: ''},
  id: {type: Number, required: true},
  textNoData: {type: String, required: true, default: 'Keine Daten vorhanden! Erstelle welche!'},
  tooltip: {type: String, required: true, default: 'Klicken, um weitere Datensätze anzuzeigen'},
  textClickForMore: {type: String, required: true, default: 'Klicken, um weitere Datensätze anzuzeigen'},
})

const emits = defineEmits(['on:datasetSelected'])


const dataCount = ref(0)
const dialogIsVisible = ref(false)

const onDatasetSelected = (id) => {
  emits('on:datasetSelected', id)
}

const selectNewDataset = () => {
  dialogIsVisible.value = true
}

onMounted(async () => {
  if (props.datatable) {
    dataCount.value = await requests.count(props.datatable)
  } else {
    console.log('No datatable was provided!')
  }

})
</script>
