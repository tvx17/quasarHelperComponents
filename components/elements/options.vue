<template>
  <div class="text-overline">
    <div class="row">
      <div :class="'col-' + props.labelColumnWidth">
        <div>{{ props.label }}</div>
      </div>
      <div :class="'col-' + props.fieldColumnWidth" v-if="elementValue">
        <div class="row">
          <div class="col">
            <q-btn-group
              v-if="elementData"
              flat rounded
              :style="hasError ? 'background-color:red;' : ''">
              <q-btn
                size="sm"
                v-for="(element, elementIndex) in props.data"
                v-bind:key="elementIndex"
                :label="element.label"
                :color="elementData[elementIndex] ? 'primary': 'white'"
                :text-color="elementData[elementIndex] ? 'white': 'black'"
                :outline="!elementData[elementIndex]"
                @click="onSelect(elementIndex)"
              />
            </q-btn-group>
          </div>
        </div>
        <div class="row" v-if="hasError">
          <div class="col text-red text-weight-bold">
            Bitte eine Auswahl treffen
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import {useI18n} from "vue-i18n";
import {computed, onMounted, ref} from "vue";


const {t} = useI18n();

const props = defineProps(
  {
    modelValue: {required: true},
    label: {required: true, type: String},
    data:{required: true, type: Object},
    checkError: {required: false, type: Boolean, default: false},
    disabler: {required: false, type: Object, default: ()=>{}},
    enabler:{required: false, type: Object, default: ()=>{}},
    labelColumnWidth: { required: false, type: Number, default: 3 },
    fieldColumnWidth: { required: false, type: Number, default: 9 },
  }
);
const emits = defineEmits(['update:modelValue']);

const elementData = ref()

const elementValue = computed({
  get: () => props.modelValue, set: (value) => emits('update:modelValue', value)
})
const checkError = () => {
  if(props.checkError) {
    let hasErrorLocal = true
    for (const key of props.keys) {
      if (elementValue.value[key]) {
        hasErrorLocal = false
      }
    }
    hasError.value = hasErrorLocal
  }
}

const hasError = ref(false)


const onSelect = (elementIndex) => {
  elementData.value[elementIndex] = !elementData.value[elementIndex]
  if(props.disabler && !elementData.value[elementIndex] && props.disabler[elementIndex]) {
    for(const key of props.disabler[elementIndex]) {
      elementData.value[key] = false
    }
  }
  if(props.enabler && elementData.value[elementIndex] && props.enabler[elementIndex]) {
    for(const key of props.enabler[elementIndex]) {
      elementData.value[key] = true
    }
  }
  emits('update:modelValue', elementData.value)
  checkError()
};

onMounted(() =>{
  elementData.value = props.modelValue

  if(Object.keys(elementData.value).length !== Object.keys(props.data).length) {
    for(const key of Object.keys(props.data)) {
      if(!elementData.value[key]) {
        elementData.value[key] = props.data[key]
      }
    }
  }

  checkError()
})

</script>
