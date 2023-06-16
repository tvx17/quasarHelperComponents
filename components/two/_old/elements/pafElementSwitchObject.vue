<template>
  <div class="text-overline">
    <div class="row">
      <div :class="firstColumnWidth">
        {{ props.label }}
        <div>{{elementValue}}</div>
      </div>
      <div class="col">
        <q-btn-group flat rounded>
          <q-btn
            v-for="(element, index) in props.states"
            v-bind:key="index"
            :label="element.label + elementValue[props.keys[index]]"
            @click="onSelect(index)"
            :color="elementValue[props.keys[index]] ? 'primary' : ''"
            :text-color="elementValue[props.keys[index]]  ? 'white' : 'black'"
            size="sm"
            :outline="elementValue[props.keys[index]]"
          />
        </q-btn-group>
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
    states: {required: true, type: Array},
    keys: {required: true, type: Array},
  }
);
const emits = defineEmits(['update:modelValue']);


const elementValue = computed({
  get: () => props.modelValue, set: (value) => emits('update:modelValue', value)
})


const onSelect = (index) => {
  for(const keyIndex in props.keys) {
    elementValue.value[props.keys[keyIndex]] = false
  }
  elementValue.value[props.keys[index]] = true
};

</script>
