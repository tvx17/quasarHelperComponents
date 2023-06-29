<template>
  <q-btn
    :label="props.buttonText"
    class="full-width"
    color="negative"
    dense
    flat
    rounded
    @click="onClick"
  >
  </q-btn>
</template>
<script setup lang="ts">
import {dialogs} from 'src/tvx/helper/messages';


const props = defineProps({
  buttonText: {
    type: String,
    required: false,
    default: 'Löschen',
  },
  showIcon: {
    type: Boolean,
    required: false,
    default: false,
  },
  title: {
    type: String,
    required: false,
    default: 'Datensatz löschen',
  },
  text: {
    type: String,
    required: false,
    default: 'Möchtest Du wirklich den Datensatz löschen?',
  },
});

const emits = defineEmits(['on:click','on:delete:confirm','on:delete:cancel']);

const onClick = () => {
  dialogs.deleteAsync(props.title,props.text).then((result: boolean) =>{
   if(result){
     emits('on:delete:confirm');
   } else {
     emits('on:delete:cancel');
   }

  })
  emits('on:click');
};


</script>
