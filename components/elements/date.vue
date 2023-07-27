<template>
  <div class="text-overline">
    <div class="row">
      <div :class="'col-' + props.labelColumnWidth">
        {{ props.label }}
      </div>
      <div :class="'col-' + props.fieldColumnWidth">
        <q-input
          v-model="elementValue"
          mask="####-##-##"
          :label="props.label"
          :rules="props.rules"
          :error-message="props.errorMessage !== '' ? props.errorMessage : ''"
          :disable="props.disable"
          :error="props.errorMessage !== ''"
          :counter="
            elementValue &&
            (elementValue.length < 10 || elementValue.length > 10)
          "
          @blur="$emit('update:done')"
          dense
        >
          <template v-slot:append>
            <q-icon class="cursor-pointer" name="event">
              <q-popup-proxy
                cover
                transition-hide="scale"
                transition-show="scale"
              >
                <q-date
                  v-model="elementValue"
                  :locale="{
                    days: props.labelDays,
                    daysShort: props.labelDaysShort,
                    months: props.labelMonths,
                    monthsShort: props.labelMonthsShort
                  }"
                  first-day-of-week="0"
                  mask="YYYY-MM-DD"
                  today-btn
                >
                  <div class="row items-center justify-end">
                    <q-btn
                      v-close-popup
                      :label="props.labelClose"
                      color="primary"
                      flat
                    />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: { required: true },
  label: { required: true, type: String },
  rules: { required: false, type: Array, default: () => [] },
  errorMessage: { required: false, type: String, default: '' },
  disable: { required: false, type: Boolean, default: false },
  labelColumnWidth: { required: false, type: Number, default: 3 },
  fieldColumnWidth: { required: false, type: Number, default: 9 },
  labelDays: { required: false, type: Array, default: () => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
  labelDaysShort: { required: false, type: Array, default: () => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
  labelMonths: { required: false, type: Array, default: () => ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] },
  labelMonthsShort: { required: false, type: Array, default: () => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] },
  labelClose: { required: false, type: String , default: 'Close' },
});
const emits = defineEmits(['update:modelValue', 'update:done']);

const elementValue = computed({
  get: () => props.modelValue,
  set: (value) => emits('update:modelValue', value),
});

const validateDate = (val) => {
  return val.match(/^(\d{4}-\d{2}-\d{2}|\d{2}.\d{2}.\d{4})$/);
};
</script>
