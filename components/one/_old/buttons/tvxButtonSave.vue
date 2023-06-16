<template>
  <q-btn
    :label="props.label ? props.label : $t('common.save')"
    class="full-width"
    color="primary"
    dense
    flat
    @click="onClick"/>
</template>

<script setup>

import {api} from 'boot/axios';
import {notifies} from 'src/app/messages';
import {selectedData} from 'src/app/store';
import {useI18n} from "vue-i18n";

const {t} = useI18n({useScope: 'global'});

const props = defineProps(
  {
    label: {
      type: String,
      required: false},
    endpoint: {type: String, default: '', required: true}});

const onClick = async () => {
  if (selectedData.value['id'] === -1) {
    try {
      delete selectedData.value['id'];
      const result = await api.post(props.endpoint, selectedData.value);
      notifies.positive(t('scheduler.savedNewSchedule'));
    } catch (e) {
      notifies.error(e)
    }
    //methods.close(true);
  } else {
    try {
      const result = await api.patch(props.endpoint, selectedData.value);

      notifies.positive(t('scheduler.savedExistingSchedule'));
    } catch (e) {
      console.log(e)
      notifies.error(e)
    }
  }
};

</script>
