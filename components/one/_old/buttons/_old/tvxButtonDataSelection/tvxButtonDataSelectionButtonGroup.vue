<template>
  <span>
    <button-add
      :datatable="props.datatable"
      :form="props.form"
      :tooltip="props.textNew"
      @status:dialog="emits('status:dialog', $event)"
      @done:action="emits('done:action', $event)"
    />
    <button-edit
      @click="emits('on:datasetSelected', props.id)"
      v-if="summary.length > 1"
      :id="props.id"
      :datatable="props.datatable"
      :tooltip="props.textEdit"

    />
    <button-delete
      v-if="summary.length > 1"
      :id="props.id"
      :datatable="props.datatable"
      :tooltip="props.textDelete"
      position="top-right"
      @status:dialog="emits('status:dialog', $event)"
    />
  </span>
</template>
<script setup>
import ButtonEdit from "components/buttons/_old/buttonEdit.vue";
import ButtonDelete from "components/buttons/_old/buttonDelete.vue";
import ButtonAdd from "components/buttons/_old/buttonAdd.vue";

const props = defineProps({
  datatable: {type: String, required: true},
  id: {type: Number, required: true, default: null},
  form: {type: String, required: true},
  textNew: {type: String, required: false, default: 'Neu'},
  summary: {type: String, required: true, default: ''},
  textEdit: {type: String, required: false, default: 'Bearbeiten'},
  textDelete: {type: String, required: false, default: 'Löschen'},
})

const emits = defineEmits(['status:dialog','done:action'])

</script>
