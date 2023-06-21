<template>
  <span ref="target">
    <tvx-button-data-selection-name-element
      v-if="dataRow"
      :id="dataRow.id"
      :summary="dataRow.summary"
      :datatable="props.datatable"
      :buttonPosition="props.buttonPosition"
    />
    <tvx-button-data-selection-options :datatable="props.datatable" v-if="!isOutside"/>
  </span>
</template>

<script setup>
// ********************************** Imports **********************************
import { onMounted, ref } from 'vue';
import TvxButtonDataSelectionNameElement from './tvxButtonDataSelection/tvxButtonDataSelectionNameElement.vue';
import crud, { crudModes } from '../../helper/crud';
import TvxButtonDataSelectionOptions
  from "src/tvx/components/buttons/tvxButtonDataSelection/tvxButtonDataSelectionOptions.vue";
import { useMouseInElement } from "@vueuse/core";



// ********************************** Props ************************************
const props = defineProps({
  id: { type: Number, required: false, default: null }, // It is possible to give this component an ID. If this is the case, the corresponding data record is read from the data table, which is also to be transmitted, and written to the reactive variable dataRow.
  datatable: { type: String, required: true, default: null }, // The datatable where to count and search for data
  buttonPosition: { type: String, required: false, default: 'left' },
});

// ********************************** Emits ************************************
/*const emits = defineEmits(['on:updated'])*/

const target = ref(null);


const {isOutside } = useMouseInElement(target);
const dataRow = ref(null);
// ********************************** Methods **********************************
const loadData = async () => {
  if (props.id != null) {
    // An ID is given, so read the dataset
    dataRow.value = await crud.readByPk({ destination: props.datatable });
  } else {
    // If no ID is given, the first dataset is selected
    dataRow.value = await crud.readFirst({ destination: props.datatable });
  }
};

onMounted(async () => {
  await loadData();
});
</script>
