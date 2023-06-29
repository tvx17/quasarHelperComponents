<template>
  <div class="text-overline">
    <div class="row">
      <div :class="firstColumnWidth">{{ $t('scheduler.parameter') }}</div>
      <div class="col">
        <div class="row" v-for="(param, index) in Object.keys(params)" :key="index">
          <div class="col-2">{{ param }}</div>
          <div class="col">
            <q-input dense v-model="selectedData['automation_parameter'][param]"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {firstColumnWidth} from "src/app/definitions";
import {selectedData} from "src/app/store";
import {onMounted, ref, watch} from "vue";
import {api} from "boot/axios";

const props = defineProps({automationId: {type: Number, required: true}});

const params = ref({})

const loadParams = async() => {
  const {data} = await api.get(`/automation?id=${props.automationId}`)
  params.value = data['parameter']
}

watch(()=>props.automationId,(newValue, oldValue)=>{
})

onMounted(async() => {
  if(props.automationId){
    await loadParams()
  }
})


</script>
