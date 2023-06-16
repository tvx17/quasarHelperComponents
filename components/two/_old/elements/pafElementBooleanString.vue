<template>
  <div class="text-overline">
    <div class="row">
      <div :class="firstColumnWidth">
        {{ props.label }}
      </div>
      <div class="col">
        <q-btn
          :icon="activated ? props.activatedIcon : props.deactivatedIcon"
          :label="activated ? (props.activatedLabel === 'on' ? $t('states.activated') : props.activatedLabel ) : (props.deactivatedLabel === 'off' ? $t('states.deactivated') : props.deactivatedLabel)"
          :color="activated ? 'primary' : 'white'"
          size="sm"
          :text-color="activated  ? 'white' : 'black'"
          :outline="!activated"
          @click="onSelect"
          unelevated
          rounded
        />
      </div>
    </div>
  </div>

</template>

<script setup>
import {computed, onMounted, ref} from "vue";

import {firstColumnWidth} from "src/app/definitions";

const props = defineProps(
  {
    modelValue: {required: true},
    label: {required: false, type: String, default: 'No value set'},
    activatedLabel: {required: false, type: String, default: 'on'},
    activatedIcon: {required: false, type: String, default: 'fa-regular fa-eye'},
    activatedString: {required: false, type: String, default: 'on'},
    deactivatedLabel: {required: false, type: String, default: 'off'},
    deactivatedIcon: {required: false, type: String, default: 'fa-regular fa-eye-slash'},
    deactivatedString: {required: false, type: String, default: 'off'},
    emptyValues: {required: false, type: Boolean, default: false},
  }
);
const emits = defineEmits(['update:modelValue']);

const elementValue = computed({
  get: () => props.modelValue, set: (value) => emits('update:modelValue', value)
})

const activated = ref()

const onSelect = () => {
  activated.value = !activated.value
  if(activated.value){
    emits('update:modelValue', checkEmptyValue(props.activatedString))
  }else{
    emits('update:modelValue', checkEmptyValue(props.deactivatedString))
  }
};
const checkEmptyValue = (checkValue) => {
  if (props.emptyValues) {
    if (checkValue === 'on' || checkValue === 'off') {
      return undefined
    }
  }
  return checkValue
}
onMounted(() => {
  if(props.modelValue === props.activatedString) {
    activated.value = true
    return
  }
  if(props.modelValue === props.deactivatedString || props.modelValue === '') {
    activated.value = false
  }

})

</script>
