<template>
  <div class="text-overline">
    <div class="row">
      <div :class="'col-' + props.labelColumnWidth">
        {{ props.label }}
      </div>
      <div :class="'col-' + props.fieldColumnWidth">
        <q-input
          v-model="elementValue"
          dense
          :label="$t('scheduler.startTime')"
          :rules="props.rules"
          :error-message="props.errorMessage !== '' ? props.errorMessage : ''"
          :error="props.errorMessage !== ''"
          mask="time"
          @blur="$emit('update:done')"
          :disable="props.disable"
          :counter="
            elementValue && elementValue.length < 5 && elementValue.length > 5
          "
        >
          <template v-slot:append>
            <q-icon class="cursor-pointer" name="access_time">
              <q-popup-proxy
                cover
                transition-hide="scale"
                transition-show="scale"
              >
                <q-time v-model="elementValue" format24h>
                  <div class="row items-center justify-end">
                    <q-btn
                      v-close-popup
                      color="primary"
                      flat
                      :label="$t('common.close')"
                    />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
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
  rules: { required: false, type: Array, default: () => [] },
  errorMessage: { required: false, type: String },
  disable: { required: false, type: Boolean, default: false },
  labelColumnWidth: { required: false, type: Number, default: 3 },
  fieldColumnWidth: { required: false, type: Number, default: 9 },
});
const emits = defineEmits(['update:modelValue', 'update:done']);

const elementValue = computed({
  get: () => props.modelValue,
  set: (value) => emits('update:modelValue', value),
});
</script>
