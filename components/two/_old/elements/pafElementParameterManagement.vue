<template>
  <div>
    <div class="text-overline">
      <div class="row">
        <div :class="firstColumnWidth">
          {{ props.label }}
        </div>
        <div class="col">
          <div class="row">
            <div class="col">
              <q-btn
                v-if="accessRights.check({group: props.group, name: props.name, rights:'edit', note:'Darf der Benutzer das Feld InternalName anzeigen'})"
                :label="$t('scheduler.newParameter')"
                class="full-width"
                dense
                flat
                @click="onNewParameterClick"/>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div v-if="'parameter' in selectedData">
                <div
                  v-for="(paramKey, paramIndex) in Object.keys(elementValue)"
                  v-bind:key="paramIndex"
                  class="row">
                  <div class="col-1">
                    <q-btn
                      v-if="accessRights.check({group: props.group, name: props.name, rights:'delete', note:'Darf der Benutzer einen Datensatz löschen'})"
                      dense
                      flat
                      icon="fa-solid fa-trash"
                      size="sm"
                      @click="onParameterDelete(paramKey)"/>
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

  </div>

</template>

<script setup>
import {useI18n} from "vue-i18n";
import {selectedData} from 'src/app/store';
import {computed} from "vue";
import {dialogs} from "src/app/messages";
import {firstColumnWidth} from "src/app/definitions";
import accessRights from "src/app/accessRights";

const {t} = useI18n();

const props = defineProps(
  {
    modelValue: {required: true},
    label: {required: true, type: String},
    group: {required: true, type: String},
    name: {required: true, type: String}
  }
);
const emits = defineEmits(['update:modelValue']);

const elementValue = computed({
  get: () => props.modelValue, set: (value) => emits('update:modelValue', value)
})

const onNewParameterClick = async () => {
  const result = await dialogs.new('Neuer Parameter', 'Name des neuen Parameters');
  if (result) {
    selectedData.value['parameter'][result] = '';
  }
}
const onParameterDelete = async (key) => {
  const result = await dialogs.delete(t('botsPage.deleteParameterTitle'), t('botsPage.deleteParameterMessage', [key]))

  if (result) {
    delete selectedData.value['parameter'][key];
  }
}

</script>
