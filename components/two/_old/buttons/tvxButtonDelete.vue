<template>
  <q-btn
    v-if="Object.keys(selectedData).length > 0 && 'id' in selectedData && selectedData.id !== -1"
    class="full-width"
    color="red"
    dense
    flat
    :label="props.label === undefined ? $t('common.delete') : props.label"
    @click="onClick"/>
</template>

<script setup>

import {api} from 'boot/axios';
import {dialogs, notifies} from 'src/app/messages';
import {overviewVisible, selectedData} from 'src/app/store';
import {useI18n} from "vue-i18n";
/*import accessRights from "src/app/accessRights";*/

const {t} = useI18n({useScope: 'global'});

const props = defineProps(
  {
    label: {type: String},
    deleteTitle: {type: String},
    deleteMessage: {type: String, default: 'Möchtest Du den Datensatz wirklich löschen?'},
    endpoint: {type: String, required: true},
    id: {type: Number, required: false},
    accessRightsPage: {type: String, required: true},
  });

const onClick = async () => {
  const result = await dialogs.delete(props.deleteTitle ? props.deleteTitle : t('common.delete'), props.deleteMessage ? props.deleteMessage : t('buttons.delete.message'));
  if (result) {
    try {
      const {request} = await api.delete(props.endpoint + '?id=' + (props.id ? props.id : selectedData.value.id));
      notifies.positive();
      overviewVisible.value = true;
      selectedData.value = {};
    } catch (e) {
      notifies.error(e)
    }
  }
};

</script>
