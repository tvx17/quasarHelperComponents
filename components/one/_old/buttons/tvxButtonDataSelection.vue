<template>
  <span ref="target">
    <tvx-button-data-selection-name-element
      :id="datarow.id"
      :summary="datarow.summary"
      :datatable="props.datatable"
    />
  </span>
</template>

<script setup>
// ********************************** Imports **********************************
import {onMounted, ref} from "vue";
import TvxButtonDataSelectionNameElement
  from "./tvxButtonDataSelection/tvxButtonDataSelectionNameElement.vue";
import crud from "src/app/crud";


// ********************************** Props ************************************
const props = defineProps({
  id: {type: Number, required: false, default: null}, // It is possible to give this component an ID. If this is the case, the corresponding data record is read from the data table, which is also to be transmitted, and written to the reactive variable dataRow.
  datatable: {type: String, required: true, default: null}, // The datatable where to count and search for data
})

// ********************************** Emits ************************************
const emits = defineEmits()

const datarow = ref(null)

// ********************************** Methods **********************************
const loadData = async () => {
  if (props.id != null) {
    // If no ID is given, the first dataset is selected
    datarow.value = await crud.r({datatable: props.datatable, getFirst: true})
  } else {
    // An ID is given, so read the dataset
    datarow.value = await crud.r({datatable: props.datatable, id: props.id})
  }

}


// ********************************** Vue lifecycle hooks **********************
onMounted(async () => {
})
</script>
