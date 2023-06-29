<template>
  <q-btn
    :label="props.buttonText"
    class="full-width"
    color="primary"
    dense
    flat
    rounded
    @click="emits('on:click')"
  >
  </q-btn>
</template>
<script setup lang="ts">
import {dialogs} from 'src/tvx/helper/messages';


const props = defineProps({
  buttonText: {
    type: String,
    required: false,
    default: 'Neu',
  },
  showIcon: {
    type: Boolean,
    required: false,
    default: false,
  }
});

const emits = defineEmits(['on:click']);
</script>
