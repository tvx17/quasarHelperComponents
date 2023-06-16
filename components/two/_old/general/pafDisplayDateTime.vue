<template>
<div class="row">
  <div :class="firstColumnWidth">{{props.label}}:</div>
  <div class="col">
    <span>{{date}}</span>
    <span> - </span>
    <span>{{time}} {{$t('dateTime.common.oClock')}}</span>
  </div>
</div>
</template>

<script setup>
import {firstColumnWidth} from 'src/app/definitions';
import {onMounted, ref} from 'vue';

const props = defineProps(
  {
    label: {type: String, default: 'Löschen'},
    value:{}
  });

const date = ref()
const time = ref()

onMounted(() => {
  const temp = props.value.split('T')
  time.value = temp[1]
  const tempDate = temp[0].split('-')
  date.value = tempDate[2] + '.' + tempDate[1] + '.' + tempDate[0]
})


</script>
