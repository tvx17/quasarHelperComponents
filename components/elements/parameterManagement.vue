<template>
  <div>
    <div class="text-overline">
      <div class="row">
        <div :class="'col-' + props.labelColumnWidth">
          {{ props.label }}
        </div>
        <div class="col">
          <div class="row">
            <div class="col">
              <q-btn
                :label="props.textNewParameter"
                class="full-width"
                dense
                flat
                @click="onNewParameterClick"
              />
            </div>
          </div>
          <div class="row">
            <div :class="'col-' + props.fieldColumnWidth">
              <div
                v-for="(paramKey, paramIndex) in Object.keys(elementValue)"
                v-bind:key="paramIndex"
                class="row"
              >
                <div class="col-1">
                  <q-btn
                    dense
                    flat
                    icon="fa-solid fa-trash"
                    size="sm"
                    @click="onParameterDelete(paramKey)"
                  />
                </div>
                <div class="col q-pr-sm">
                  {{ paramKey }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
import { dialogs } from 'src/tvx/helper/messages';

const { t } = useI18n();

const props = defineProps({
  modelValue: { required: true },
  label: { required: true, type: String },
  group: { required: true, type: String },
  name: { required: true, type: String },
  textNewParameter: {
    required: false,
    type: String,
    default: 'Neuer Parameter',
  },
  labelColumnWidth: { required: false, type: Number, default: 3 },
  fieldColumnWidth: { required: false, type: Number, default: 9 },
});
const emits = defineEmits(['update:modelValue']);

const elementValue = computed({
  get: () => props.modelValue,
  set: (value) => emits('update:modelValue', value),
});

const onNewParameterClick = () => {
  dialogs
    .newAsync('Neuer Parameter', 'Name des neuen Parameters')
    .then((result) => {
      if (result) {
        elementValue.value[result] = '';
      }
    });
};
const onParameterDelete = async (key) => {
  dialogs.deleteAsync('Parameter löschen', 'Möchtest Du diesen Parameter wirklich löschen?').then((result) => {
    if (result) {
      delete elementValue.value[key];
    }
  });
};
</script>
