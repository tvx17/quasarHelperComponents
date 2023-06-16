<template>
  <div class="text-overline">
    <div class="row">
      <div :class="[firstColumnWidth, props.errorMessage !=='' ? 'text-red' : '']">
        {{ props.label }}
      </div>
      <div class="col">
        <q-input
          v-model="value"
          dense
          :disable="props.disable || !props.editable"
          :rules="props.rules"
          :error-message="props.errorMessage !== '' ? props.errorMessage : ''"
          :error="props.errorMessage !== ''"
        >
        </q-input>
      </div>
    </div>
  </div>

</template>

<script setup>
import {useI18n} from "vue-i18n";
import {overviewVisible, selectedData} from 'src/app/store';
import {computed} from "vue";
import {firstColumnWidth} from "src/app/definitions";

const {t} = useI18n();

const props = defineProps(
  {
    modelValue: {required: true},
    label: {required: true, type: String},
    rules: {required: false, type: Array, default: () => []},
    errorMessage: {required: false, type: String},
    disable: {required: false, type: Boolean, default: false},
    editable: {required: false, type: Boolean, default: true},
  }
);
const emits = defineEmits(['update:modelValue']);

const value = computed({
  get: () => props.modelValue, set: (value) => emits('update:modelValue', value)
})


const onClick = () => {
  overviewVisible.value = true;
  selectedData.value = {};
};

</script>
