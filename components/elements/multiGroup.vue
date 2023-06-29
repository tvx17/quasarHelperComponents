<template>
  <div class="text-overline">
    <div class="row">
      <div :class="'col-' + props.labelColumnWidth">
        {{ props.label }}
      </div>
      <div :class="'col-' + props.fieldColumnWidth">
        <q-option-group
          v-model="value"
          :options="props.options"
          color="yellow"
          type="toggle"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';

const { t } = useI18n();

const props = defineProps({
  modelValue: { required: true },
  label: { required: true, type: String },
  rules: { required: false, type: Array, default: () => [] },
  errorMessage: { required: false, type: String },
  disable: { required: false, type: Boolean, default: false },
  editable: { required: false, type: Boolean, default: true },
  options: { required: false, type: Array, default: () => [] },
  labelColumnWidth: { required: false, type: Number, default: 3 },
  fieldColumnWidth: { required: false, type: Number, default: 9 },
});
const emits = defineEmits(['update:modelValue']);

const value = computed({
  get: () => props.modelValue,
  set: (value) => emits('update:modelValue', value),
});

const onClick = () => {};
</script>
