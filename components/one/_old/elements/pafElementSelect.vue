<template>
  <div class="text-overline">
    <div class="row">
      <div :class="[firstColumnWidth, props.errorMessage !== '' ? 'text-red' : '']">{{ props.label }}:</div>
      <div class="col">
        <q-select
          v-model="elementValue"
          :label=props.label
          :options="options"
          dense
          emit-value
          map-options
          option-label="name"
          option-value="id"
          :disable="props.disable"
          :error-message="props.errorMessage !== '' ? props.errorMessage : ''"
          :error="props.errorMessage !== ''"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import {useI18n} from "vue-i18n";
import {overviewVisible, selectedData} from 'src/app/store';
import {computed, onMounted, ref} from "vue";
import {firstColumnWidth} from "src/app/definitions";
import {api} from "boot/axios";

const {t} = useI18n();

const props = defineProps(
  {
    modelValue: {required: true},
    label: {required: true, type: String},
    optionsEndpoint: {required: true, type: String},
    rules: {required: false, type: Array, default: () => []},
    errorMessage: {required: false, type: String, default: ''},
    disable: {required: false, type: Boolean, default: false},
  }
);
const emits = defineEmits(['update:modelValue']);

const elementValue = computed({
  get: () => props.modelValue, set: (value) => emits('update:modelValue', value)
})

const options = ref([]);

const onClick = () => {
  overviewVisible.value = true;
  selectedData.value = {};
};

const loadOptionsData = async () => {
  const {data} = await api.get(props.optionsEndpoint);
  options.value = data;
}

onMounted(async () => {
  await loadOptionsData()
})

</script>
