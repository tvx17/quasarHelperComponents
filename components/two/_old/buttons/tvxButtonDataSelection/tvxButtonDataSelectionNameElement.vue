<template>
  <!--
    *********************************************************************************
    If the summary prop is empty and also no dataset was found in the table, a message will be displayed
    *********************************************************************************
    -->
  <span v-if="props.summary.length === 0 && dataCount === 0">
    <span>{{props.textNoData}}</span>
  </span>
  <!--
    *********************************************************************************
    There is exactly one dataset in the datatable. In this case no more datasets can be displayed in a selection dialog. Instead of a button a tree text message with the current summary will be displayed
    *********************************************************************************
  -->
  <span v-if="dataCount === 1">
    <span>{{ props.summary }}</span>
  </span>
  <!--
    *********************************************************************************
    There are more than one datasets in the datatable. In this case a button will be displayed to open the selection window
    *********************************************************************************
  -->
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
  <!--
    *********************************************************************************
    The dialog to select a dataset from
    *********************************************************************************
  -->
  <tvx-button-data-selection-dialog
    id=""
    is-visible=""
    datatable=""
    form=""/>
</template>
<script setup>
// ********************************** Imports **********************************
import {onMounted, ref} from "vue";
import DialogDatatableSelection from "components/buttons/_old/buttonDataSelection/dialogDataSelection.vue";
import TvxButtonDataSelectionDialog from "components/buttons/tvxButtonDataSelection/tvxButtonDataSelectionDialog.vue";

// ********************************** Props ************************************
const props = defineProps({
  datatable: {type: String, required: true, default: null}, // The datatable where to count the dataset
  summary: {type: String, required: true, default: ''}, // Summary of the dataset from the parent element
  id: {type: Number, required: true}, // Id of the dataset from the parent element
  tooltip: {type: String, required: false, default: 'Klicken, um weitere Datensätze anzuzeigen'}, // If there are more than one dataset in the datatable, this text will be displayed to give a hint, where to find more datasets
  textNoData: {type: String, required: false, default: 'Keine Daten vorhanden! Erstelle welche!'}, // If there are no datasets in the datatable, this text will be displayed
})

// ********************************** Emits **********************************
const emits = defineEmits([
  'on:datasetSelected', // A dataset was selected in the dialog
])

// ********************************** Reactive Variables ***********************
const dataCount = ref(0) // Will be filled when this component is mounted
const dialogIsVisible = ref(false) // A surrogate of the visibility of the dialog that will be submitted via prob


// ********************************** Methods **********************************
const onDatasetSelected = (currentEditId) => {
  emits('on:datasetSelected', id)
}
const selectNewDataset = () => {
  dialogIsVisible.value = true
}

// ********************************** Vue lifecycle hooks **********************************
onMounted(async () => {
  if (props.datatable) {
    dataCount.value = await requests.count(props.datatable)
  } else {
    console.log('No datatable was provided!')
  }

})
</script>
