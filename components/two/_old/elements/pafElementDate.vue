<template>
  <div class="text-overline">
    <div class="row">
      <div :class="[firstColumnWidth, props.errorMessage !== ''? 'text-red' : '']">
        {{ props.label }}
      </div>
      <div class="col-3">
        <q-input
          v-model="elementValue"
          mask="####-##-##"
          :label="props.label"
          :rules="props.rules"
          :error-message="props.errorMessage !== ''? props.errorMessage : ''"
          :disable="props.disable"
          :error="props.errorMessage !== ''"
          :counter="elementValue && (elementValue.length < 10 || elementValue.length > 10)"
          @blur="$emit('update:done',)"
          dense>
          <template v-slot:append>
            <q-icon
              class="cursor-pointer"
              name="event">
              <q-popup-proxy
                cover
                transition-hide="scale"
                transition-show="scale">
                <q-date
                  v-model="elementValue"
                  :locale="{days: days, daysShort: daysShort, months: months, monthsShort:monthsShort}"
                  first-day-of-week="0"
                  mask="YYYY-MM-DD"
                  today-btn>
                  <div class="row items-center justify-end">
                    <q-btn
                      v-close-popup
                      :label="$t('common.close')"
                      color="primary"
                      flat/>
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
import {useI18n} from "vue-i18n";
import {computed, ref} from "vue";
import {firstColumnWidth} from "src/app/definitions";

const {t} = useI18n();

const selectedValue = ref('high')

const props = defineProps(
  {
    modelValue: {required: true},
    label: {required: true, type: String},
    rules: {required: false, type: Array, default: () => []},
    errorMessage: {required: false, type: String, default: ''},
    disable: {required: false, type: Boolean, default: false},
  }
);
const emits = defineEmits(['update:modelValue','update:done']);

const days = [t('dateTime.weekdays.monday'), t('dateTime.weekdays.tuesday'), t('dateTime.weekdays.wednesday'), t('dateTime.weekdays.thursday'), t('dateTime.weekdays.friday'), t('dateTime.weekdays.saturday'), t('dateTime.weekdays.sunday')];
const daysShort = [t('dateTime.weekdays.mondayShort'), t('dateTime.weekdays.tuesdayShort'), t('dateTime.weekdays.wednesdayShort'), t('dateTime.weekdays.thursdayShort'), t('dateTime.weekdays.fridayShort'), t('dateTime.weekdays.saturdayShort'), t('dateTime.weekdays.sundayShort')];
const months = [t('dateTime.months.january'), t('dateTime.months.february'), t('dateTime.months.march'), t('dateTime.months.april'), t('dateTime.months.may'), t('dateTime.months.june'), t('dateTime.months.july'), t('dateTime.months.august'), t('dateTime.months.september'), t('dateTime.months.october'), t('dateTime.months.november'), t('dateTime.months.december')];
const monthsShort = [t('dateTime.months.januaryShort'), t('dateTime.months.februaryShort'), t('dateTime.months.marchShort'), t('dateTime.months.aprilShort'), t('dateTime.months.mayShort'), t('dateTime.months.juneShort'), t('dateTime.months.julyShort'), t('dateTime.months.augustShort'), t('dateTime.months.septemberShort'), t('dateTime.months.octoberShort'), t('dateTime.months.novemberShort'), t('dateTime.months.decemberShort')];

const elementValue = computed({
  get: () => props.modelValue, set: (value) => emits('update:modelValue', value)
})

const validateDate = (val) => {
  return val.match(/^(\d{4}-\d{2}-\d{2}|\d{2}.\d{2}.\d{4})$/);
}
</script>
