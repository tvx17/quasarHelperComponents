<template>
  <q-btn
    :label="props.buttonText"
    class="full-width"
    color="positive"
    dense
    flat
    rounded
    @click="emit('on:click')"
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

const emit = defineEmits(['on:click']);

</script>
