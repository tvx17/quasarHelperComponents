<template>
  <div class="text-overline">
    <div class="row">
      <div :class="'col-' + props.labelColumnWidth">
        {{ props.label }}
      </div>
      <div :class="'col-' + props.fieldColumnWidth">
        <div class="row text-red text-weight-bold" v-if="labelSetAValue && elementValue === 0">
          <div class="col">Bitte einen Wert setzen</div>
        </div>
        <div class="row">
          <div class="col">
            <div class="row">
              <div class="col"
                   v-if="props.labelExtraDisplay">
                <span v-if="props.labelExtraValueNever && elementValue === 0">{{ labelExtraValueMany.replace('{x}', elementValue) }}</span>
                <span v-if="props.labelExtraValueMany && elementValue > 1">{{ labelExtraValueMany.replace('{x}', elementValue) }}</span>
                <span v-if="labelExtraValueOne && elementValue === 1">{{ props.labelExtraValueOne }}</span>

              </div>
              <div
                :class="props.labelExtraDisplay ? 'col-10' : 'col'">
                <q-slider
                  v-model="elementValue"
                  :max="props.max"
                  :min="props.min"
                  :step="props.step"
                  label
                  switch-label-side
                  switch-marker-labels-side
                  :label-always="props.labelAlways"
                  markers
                  :label-value="props.labelValue"
                  :label-color="elementValue === 0 ? 'red' : 'primary'"
                  snap
                  style="width: 100%"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, ref} from 'vue';

const props = defineProps({
  modelValue: {required: true},
  label: {required: true, type: String},
  min: {required: true, type: Number, default: 1},
  max: {required: true, type: Number, default: 10},
  step: {required: false, type: Number, default: 1},
  labelValue: {required: true, type: [String, Number]},
  labelColumnWidth: {required: false, type: Number, default: 3},
  fieldColumnWidth: {required: false, type: Number, default: 9},
  labelAlways: {required: false, type: Boolean, default: false},
  labelExtraDisplay: {required: false, type: Boolean, default: false},
  labelExtraValueNever: {required: false, type: String, default: 'Never'},
  labelExtraValueOne: {required: false, type: String, default: 'Just one time'},
  labelExtraValueMany: {required: false, type: String, default: 'Every {x} times'},
  labelSetAValue: {required: false, type: String}

});
const emits = defineEmits(['update:modelValue']);

const elementValue = computed({
  get: () => props.modelValue,
  set: (value) => emits('update:modelValue', value),
});

const hasError = ref(false);
</script>
