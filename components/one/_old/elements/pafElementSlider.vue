<template>
  <div class="text-overline">
    <div class="row">
      <div :class="[firstColumnWidth, elementValue === 0 ? 'text-red' : '']">
        {{ props.label }}
      </div>
      <div class="col">
        <div class="row text-red text-weight-bold" v-if="elementValue === 0">
          <div class="col">
            Bitte einen Wert setzen
          </div>
        </div>
        <div class="row">
          <div class="col">
            <q-slider
              v-model="elementValue"
              :max="props.max"
              :min="props.min"
              :step="props.step"
              label
              switch-label-side
              switch-marker-labels-side
              label-always
              markers
              :label-value="props.labelValue"
              :label-color="elementValue === 0 ? 'red' : 'primary'"
              snap
              style="width: 100%"/>
          </div>
        </div>

      </div>
    </div>
  </div>

</template>

<script setup>
import {useI18n} from "vue-i18n";
import {computed, ref} from "vue";
import {firstColumnWidth} from "src/app/definitions";

const {t} = useI18n();

const selectedValue = ref('high')

const props = defineProps(
  {
    modelValue: {required: true},
    label: {required: true, type: String},
    min: {required: true, type: Number, default: 1},
    max: {required: true, type: Number, default: 10},
    step: {required: false, type: Number, default: 1},
    labelValue: {required: true, type: [String, Number]},
  }
);
const emits = defineEmits(['update:modelValue']);


const elementValue = computed({
  get: () => props.modelValue, set: (usernameOrEmail) => emits('update:modelValue', value)
})

const hasError = ref(false);


</script>
