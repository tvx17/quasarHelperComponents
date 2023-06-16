<template>
  <q-bar>
    <div>
      {{ label }}
    </div>
    <q-space/>
    <q-btn
      v-if="props.closeButton"
      dense
      flat
      icon="fa-solid fa-xmark"
      @click="onClick"/>
  </q-bar>
</template>

<script setup>
import {useI18n} from "vue-i18n";
import {overviewVisible, selectedData} from 'src/app/store';

const {t} = useI18n();

const props = defineProps(
  {
    label: {type: String, default: ''},
    closeButton: {type: Boolean, default: true}
  }
);


const onClick = () => {
  overviewVisible.value = true;
  selectedData.value = {};
};

</script>
