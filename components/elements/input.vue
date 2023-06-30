<template>
  <div class="text-overline">
    <div class="row">
      <div :class="'col-' + props.labelColumnWidth">
        {{ props.label }}
      </div>
      <div :class="'col-' + props.fieldColumnWidth">
        <q-input
          @blur="emit('on:blur')"
          v-model="value"
          dense
          :disable="props.disable || !props.editable"
          :error-message="props.errorMessage !== '' ? props.errorMessage : ''"
          :error="props.errorMessage !== ''"
        >
        </q-input>
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
  errorMessage: { required: false, type: String, default:'' },
  disable: { required: false, type: Boolean, default: false },
  editable: { required: false, type: Boolean, default: true },
  labelColumnWidth: { required: false, type: Number, default: 3 },
  fieldColumnWidth: { required: false, type: Number, default: 9 },
});
const emit = defineEmits(['update:modelValue','on:blur']);

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const onClick = () => {
  overviewVisible.value = true;
  selectedData.value = {};
};
</script>
