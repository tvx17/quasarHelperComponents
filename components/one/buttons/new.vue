<template>
  <div class="row q-ma-xs">
    <div class="col">
      <q-btn
        class="full-width"
        dense
        flat
        @click="emits('on:click')"
        :label="props.label === undefined ? $t(props.label) : props.label"/>
    </div>
  </div>
</template>

<script setup>


const props = defineProps(
  {
    label: {type: String, required: false, default: 'common.new'},
  }
)

const emits = defineEmits(['on:click'])


</script>
