<template>
  <q-dialog
    persistent
    v-model="isVisible"
    transition-show="slide-down"
    transition-hide="slide-up"
    position="top"
  >
    <q-card style="min-width: 50%">
      <q-card-section>
        <q-bar class="bg-white">
          {{ props.title }}
          <q-space/>
          <q-btn class="on-right" icon="fa-solid fa-xmark" flat dense size="sm" @click="onCloseButtonClicked">
            <q-tooltip>
              Close
            </q-tooltip>
          </q-btn>
        </q-bar>
      </q-card-section>
      <q-card-section>
        <component :is="currentFormComponent" @done-action="emits('done:action', $event)"/>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import formProject from 'components/forms/formProject.vue'
import formBooks from 'components/forms/formBook.vue'

const props = defineProps({
  datatable: {type: String, required: true},
  title: {type: String, required: true, default: 'Neu'},
  form: {type: String, required: true},
  isVisible: {type: Boolean, required: true, default: false}
})

const emits = defineEmits(['status:dialog','done:action'])

const isVisible = ref(false)
const currentFormComponent = ref('')


watch(() => props.isVisible, (newValue, oldValue) => {
  isVisible.value = newValue
})

const onCloseButtonClicked = () => {
  emits('status:dialog', false)
}

const setFrom = (formName) => {
  switch (formName) {
    case 'projects':
      currentFormComponent.value = formProject
      break
    case 'books':
      currentFormComponent.value = formBooks
      break
  }
}

onMounted(() => {
  setFrom(props.form)
  isVisible.value = props.isVisible

})


</script>
