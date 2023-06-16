<template>
  <div class="row q-ma-xs">
    <div class="col">
      <q-btn
        class="full-width"
        dense
        flat
        @click="onNew"
        :label="props.label === undefined ? $t('common.new') : props.label"/>
    </div>
  </div>
</template>

<script setup>
import {overviewVisible, selectedData} from 'src/app/store';
import accessRights from "src/app/accessRights";


const props = defineProps(
  {
    label: {type: String},
    newData: {type: Object, required: true},
    accessRightsPage: {type: String, required: true}
  }
)
const onNew = () => {
  overviewVisible.value = false;
  selectedData.value = props.newData;
  selectedData.value['id'] = -1;
};

</script>
