<template>
  <div class="text-overline">
    <div class="row">
      <div :class="'col-' + props.labelColumnWidth">
        {{ props.label }}
      </div>
      <div :class="'col-' + props.fieldColumnWidth">
        <div class="row text-red text-weight-bold" v-if="elementValue === 0">
          <div class="col">Bitte einen Wert setzen</div>
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
              :label-usernameOrEmail="props.labelValue"
              :label-color="elementValue === 0 ? 'red' : 'primary'"
              snap
              style="width: 100%"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { computed, ref } from 'vue';

const { t } = useI18n();

const props = defineProps({
  modelValue: { required: true },
  label: { required: true, type: String },
  min: { required: true, type: Number, default: 1 },
  max: { required: true, type: Number, default: 10 },
  step: { required: false, type: Number, default: 1 },
  labelValue: { required: true, type: [String, Number] },
  labelColumnWidth: { required: false, type: Number, default: 3 },
  fieldColumnWidth: { required: false, type: Number, default: 9 },
});
const emits = defineEmits(['update:modelValue']);

const elementValue = computed({
  get: () => props.modelValue,
  set: (value) => emits('update:modelValue', value),
});

const hasError = ref(false);
</script>
