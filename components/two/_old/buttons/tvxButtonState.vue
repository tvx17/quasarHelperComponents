<template>
  <q-btn
    :label="props.label"
    :color="props.stateCheck ? 'primary' : 'white'"
    size="sm"
    :text-color="props.stateCheck  ? 'white' : 'black'"
    :outline="!props.stateCheck"
    @click="emits('click')"
    unelevated
    rounded
  />
</template>

<script setup>

const props = defineProps({
  label: {type: String,  required: true},
  stateCheck: {type: Boolean, required: false}})

const emits = defineEmits(['click']);


</script>
