<template>
  <div class="text-overline">
    <div class="row">
      <div :class="'col-' + props.labelColumnWidth">
        {{ props.label }}
      </div>
      <div :class="'col-' + props.fieldColumnWidth">
        <q-toggle v-model="elementValue"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';

const selectedValue = ref('');

const props = defineProps({
  modelValue: { required: true },
  label: { required: true, type: String },
  activatedLabel: { required: false, type: String, default: '' },
  deactivatedLabel: { required: false, type: String, default: '' },
  labelColumnWidth: { required: false, type: Number, default: 3 },
  fieldColumnWidth: { required: false, type: Number, default: 9 },
});
const emits = defineEmits(['update:modelValue','update:setTrue','update:setFalse']);

const elementValue = computed({
  get: () => props.modelValue,
  set: (value) => emits('update:modelValue', value),
});

watch(()=>elementValue.value, (newValue) => {
  if(newValue){
    emits('update:setTrue');
  } else {
    emits('update:setFalse');
  }
});

const onSelect = () => {
  elementValue.value = !elementValue.value;
};
</script>
