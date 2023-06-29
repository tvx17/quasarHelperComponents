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
              :style="
                elementValue === undefined || elementValue === ''
                  ? 'background-color:red;'
                  : ''
              "
            >
              <q-btn
                v-for="(element, index) in props.states"
                v-bind:key="index"
                :label="element.label"
                @click="onSelect(element.value)"
                :color="elementValue === element.value ? 'primary' : ''"
                :text-color="elementValue === element.value ? 'white' : 'black'"
                size="sm"
                :outline="elementValue !== element.value"
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
import { computed, ref } from 'vue';

const { t } = useI18n();

const selectedValue = ref('high');

const props = defineProps({
  modelValue: { required: true },
  label: { required: true, type: String },
  states: { required: true, type: Array },
  labelColumnWidth: { required: false, type: Number, default: 3 },
  fieldColumnWidth: { required: false, type: Number, default: 9 },
});
const emits = defineEmits(['update:modelValue']);

const elementValue = computed({
  get: () => props.modelValue,
  set: (value) => emits('update:modelValue', value),
});

const onSelect = (assignedValue) => {
  elementValue.value = assignedValue;
};
</script>
