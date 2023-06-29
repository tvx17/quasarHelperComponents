<template>
  <q-expansion-item
    v-model="overviewVisible"
    class="text-h6"
    :label="props.label !== undefined ? props.label : $t('scheduler.overview')">
    <div class="row q-ma-xs">
      <div class="col">
        <q-table
          flat
          @row-click="onRowClick"
          :rows="rows"
          :columns="props.columns"
          row-key="name"
        >
          <template v-slot:top-left>
            <q-btn
              dense
              flat
              icon="fa-solid fa-arrows-rotate"
              @click="load"/>
          </template>
        </q-table>
      </div>
    </div>
  </q-expansion-item>
</template>

<script setup>
import {api} from 'boot/axios';
import {overviewVisible, rows, selectedData} from 'src/app/store';
import {onMounted, watch} from 'vue';
import accessRights from "src/app/accessRights";
import {notifies} from "src/app/messages";

const props = defineProps(
  {
    columns: {required: true, type: Array},
    endpoint: {type: String, required: true},
    label: {type: String, required: false},
    postLoadActions: {type: Array, required: false},
    accessRightsPage: {type: String, required: true},
  });


const load = async () => {
  rows.value = [];
  const {data} = await api.get(props.endpoint);
  if (props.postLoadActions) {
    for (const postLoadAction of props.postLoadActions) {
      switch (postLoadAction.type) {
        case 'replace':
          if (postLoadAction.method === 'time:lastPart') {
            for (let singleData of data) {
              if (singleData[postLoadAction.key] && singleData[postLoadAction.key] != null && singleData[postLoadAction.key].length > 0) {
                singleData[postLoadAction.key] = singleData[postLoadAction.key].split(':')[0] + ':' + singleData[postLoadAction.key].split(':')[1];
              }
            }
          }
          break
      }
    }
  }
  rows.value = data;
  overviewVisible.value = true;
};
const onRowClick = (evt, row, rowIndex) => {
  if (!accessRights.check({group: props.accessRightsPage, name: 'page', rights: 'details'})) {
    notifies.negative('Sorry, you have no access to view the details');
  } else {
    selectedData.value = row;
    overviewVisible.value = false;
  }
};

watch(overviewVisible, (newValue, oldValue) => {
  if (newValue) {
    load();
  }
});

onMounted(async () => {
  await load()
})

</script>
