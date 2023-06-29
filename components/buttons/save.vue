<template>
  <q-btn
    :label="props.buttonText"
    class="full-width"
    color="positive"
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
    default: 'Speichern',
  },
  showIcon: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emits = defineEmits(['on:click']);

</script>
