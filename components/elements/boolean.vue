<template>
  <div class="text-overline">
    <div class="row">
      <div :class="'col-' + props.labelColumnWidth">
        {{ props.label }}
      </div>
      <div :class="'col-' + props.fieldColumnWidth">
        <q-btn
          :label="
            elementValue
              ? props.activatedLabel === ''
                ? $t('states.activated')
                : props.activatedLabel
              : props.deactivatedLabel === ''
              ? $t('states.deactivated')
              : props.deactivatedLabel
          "
          :color="elementValue ? 'primary' : 'white'"
          size="sm"
          :text-color="elementValue ? 'white' : 'black'"
          :outline="!elementValue"
          @click="onSelect"
          unelevated
          rounded
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";

const selectedValue = ref('high');

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
    console.log('JA')
    emits('update:setTrue');
  } else {
    console.log('NEIN')
    emits('update:setFalse');
  }
});

const onSelect = () => {
  elementValue.value = !elementValue.value;
};
</script>
