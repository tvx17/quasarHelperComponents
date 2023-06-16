<template>
  <div class="text-overline">
    <div class="row">
      <div :class="firstColumnWidth">
        {{ props.label }}
      </div>
      <div class="col">
        <q-btn
          :label="elementValue ? (props.activatedLabel === '' ? $t('states.activated') : props.activatedLabel ) : (props.deactivatedLabel === '' ? $t('states.deactivated') : props.deactivatedLabel)"
          :color="elementValue ? 'primary' : 'white'"
          size="sm"
          :text-color="elementValue  ? 'white' : 'black'"
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
import {computed, ref} from "vue";

import {firstColumnWidth} from "src/app/definitions";

const selectedValue = ref('high')

const props = defineProps({});
const emits = defineEmits(['update:modelValue']);


const elementValue = computed({
  get: () => props.modelValue, set: (value) => emits('update:modelValue', value)
})


const onSelect = () => {
  elementValue.value = !elementValue.value
};

</script>
