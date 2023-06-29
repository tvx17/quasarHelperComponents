<template>
  <q-btn
    :label="props.buttonText !== '' ? props.buttonText : ''"
    class="full-width"
    :icon="props.showIcon ? 'fa-solid fa-up-right-and-down-left-from-center' : ''"
    size="sm"
    dense
    flat
    rounded
    @click="emits('on:click')"
  >
  </q-btn>
</template>
<script setup lang="ts">

const props = defineProps({
  buttonText: {
    type: String,
    required: false,
    default: '',
  },
  showIcon: {
    type: Boolean,
    required: false,
    default: true,
  },

});

const emits = defineEmits(['on:click']);




</script>
