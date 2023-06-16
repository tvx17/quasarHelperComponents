<template>
  <div class="text-overline">
    <div class="row">
      <div :class="[firstColumnWidth, props.errorMessage !== '' ? 'text-red' : '']">
        {{ props.label }}
      </div>
      <div class="col-3">
        <q-input
          v-model="elementValue"
          dense
          :label="$t('scheduler.startTime')"
          :rules="props.rules"
          :error-message="props.errorMessage !== '' ? props.errorMessage : ''"
          :error="props.errorMessage !== ''"
          mask="time"
          @blur="$emit('update:done',)"
          :disable="props.disable"
          :counter="elementValue && (elementValue.length < 5 && elementValue.length > 5)"
        >
          <template v-slot:append>
            <q-icon class="cursor-pointer"
                    name="access_time">
              <q-popup-proxy
                cover
                transition-hide="scale"
                transition-show="scale">
                <q-time
                  v-model="elementValue"
                  format24h>
                  <div class="row items-center justify-end">
                    <q-btn
                      v-close-popup
                      color="primary"
                      flat
                      :label="$t('common.close')"/>
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
    errorMessage: {required: false, type: String},
    disable: {required: false, type: Boolean, default: false}
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

const checkDate = (field) => {

}

</script>
