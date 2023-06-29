<template>
  <div class="text-overline">
    <div class="row">
      <div :class="'col-' + props.labelColumnWidth">
        {{ props.label }}
      </div>
      <div :class="'col-' + props.fieldColumnWidth">
        <div class="row">
          <div class="col">
            <q-btn-group
              flat
              rounded
              :style="firstValue === undefined || firstValue === ''? 'background-color:red;': ''"
            >
              <q-btn
                v-for="(element, index) in props.statesFirstSwitch"
                v-bind:key="index"
                :label="element.label"
                @click="onSelectFirstSwitch(element.value)"
                :color="firstValue === element.value ? 'primary' : ''"
                :text-color="firstValue === element.value ? 'white' : 'black'"
                size="sm"
                :outline="firstValue !== element.value"
              />
            </q-btn-group>
          </div>
        </div>
        <div class="row" v-if="firstValue">
          <div class="col">
            <q-btn-group
              flat
              rounded
              :style="secondValue === undefined || secondValue === ''? 'background-color:red;': ''"
            >
              <q-btn
                v-for="(element, index) in props.statesSecondSwitch"
                v-bind:key="index"
                :label="element.label"
                @click="onSelectSecondSwitch(element.value)"
                :color="secondValue === element.value ? 'primary' : ''"
                :text-color="secondValue === element.value ? 'white' : 'black'"
                size="sm"
                :outline="secondValue !== element.value"
              />
            </q-btn-group>
          </div>
        </div>
        <div
          class="row"
          v-if="elementValue === undefined || elementValue === ''">
          <div class="col text-red">Bitte eine Auswahl treffen</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { computed, onMounted, ref } from "vue";

const { t } = useI18n();

const props = defineProps({
  modelValue: { required: true },
  label: { required: true, type: String },
  statesFirstSwitch: { required: true, type: Array },
  statesSecondSwitch: { required: true, type: Array },
  labelColumnWidth: { required: false, type: Number, default: 3 },
  fieldColumnWidth: { required: false, type: Number, default: 9 },
});
const emits = defineEmits(['update:modelValue']);

const elementValue = computed({
  get: () => props.modelValue,
  set: (value) => emits('update:modelValue', value),
});

const firstValue = ref()
const secondValue = ref()

const onSelectFirstSwitch = (assignedValue) => {
  const oldKey = Object.keys(elementValue.value)[0];
  delete Object.assign(elementValue.value, {[assignedValue]: elementValue.value[oldKey] })[oldKey];
  firstValue.value = assignedValue;
};
const onSelectSecondSwitch = (assignedValue) => {
  elementValue.value[Object.keys(elementValue.value)[0]] = assignedValue;
  secondValue.value = assignedValue;
}

onMounted(() => {
  firstValue.value = Object.keys(elementValue.value)[0];
  secondValue.value = props.modelValue[Object.keys(elementValue.value)[0]]
})
</script>
