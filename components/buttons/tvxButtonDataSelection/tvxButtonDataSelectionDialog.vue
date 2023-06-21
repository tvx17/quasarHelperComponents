<template>
  <q-dialog v-model="dialogVisible">
    <q-card style="min-width: 50%">
      <q-card-section>
      <q-bar class="bg-white">
        {{ props.textChoose }}:
        <q-space/>
        <q-btn dense flat round icon="fa-solid fa-xmark" @click="emits('on:close')"/>
      </q-bar>
      </q-card-section>
      <q-card-section v-if="dataRows.length > 0">
        <q-list
          dense
          separator>
          <div v-for="(row, rowIndex) in dataRows" :key="rowIndex">
            <q-item
              v-if="row.id !== props.id"
              @click="onDatasetSelected(row.id)"
              clickable
              >
              <q-item-section>{{ row.summary }}</q-item-section>
            </q-item>
          </div>
        </q-list>
      </q-card-section>
      <q-card-actions>
        <q-btn
          v-close-popup
          class="full-width"
          flat
          label="Schließen"/>
      </q-card-actions>
    </q-card>

  </q-dialog>
</template>
<script setup>
import {onMounted, ref, watch} from "vue";
import crud from "src/app/crud";

const props = defineProps({
  textChoose: {type: String, required: false, default: 'Auswählen'},
  id: {type: Number, required: true},
  datatable: {type: String, required: true},
  isVisible: {type: Boolean, required: true},
})

const emits = defineEmits(['on:datasetSelected','on:close'])

const dialogVisible = ref(false)
const dataRows = ref([])

const load = async () => {
  dataRows.value = await crud.r({table: props.datatable, options: {isActive: true}})
  if(dataRows.value.length === undefined){
    const temp = dataRows.value
    dataRows.value = []
    dataRows.value.push(temp)
  }
}

watch(() => props.isVisible, (value) => {
  dialogVisible.value = value
})
watch(()=> props.datatable, async () => {
  await load()
})

const onDatasetSelected = (id) => {
  emits('on:datasetSelected', id)
  emits('on:close')
}

onMounted(async ()=>{
  await load()
})


</script>
