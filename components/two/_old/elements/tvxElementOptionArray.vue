<template>
  <div class="text-overline">
    <div class="row">
      <div :class="[firstColumnWidth, hasError ? 'text-red' : '']">
        {{ props.label }}
      </div>
      <div class="col">
        <div class="row">
          <div class="col">
            <q-btn-group flat rounded :style="hasError ? 'background-color:red;' : ''">
              <q-btn
                v-for="(element, index) in props.data"
                v-bind:key="index"
                :label="element['label']"
                size="sm"
                @click="onSelect(element.key)"
                :color="selectedValue === element.key ? 'primary': 'white'"
                :text-color="selectedValue === element.key  ? 'white': 'black'"
                :outline="selectedValue !== element.key"
              />
              <!--<q-btn
                v-for="(element, index) in props.labels"
                v-bind:key="index"
                :label="element"
                @click="onSelect(index)"
                :color="elementValue[props.keys[index]] ? 'primary': 'white'"
                :text-color="elementValue[props.keys[index]] ? 'white': 'black'"
                size="sm"
                :outline="!elementValue[props.keys[index]]"
              />-->
            </q-btn-group>
          </div>
        </div>
        <div class="row" v-if="hasError">
          <div class="col text-red text-weight-bold">
            {{errorMessage}}
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import {useI18n} from "vue-i18n";
import {computed, onMounted, ref} from "vue";
import {firstColumnWidth} from "src/app/definitions";

const {t} = useI18n();

const props = defineProps(
  {
    modelValue: {required: true},
    label: {required: true, type: String},
    checkError: {required: false, type: Boolean, default: false},
    data: {required: false, type: Object},
    returnType: {required: false, type: String, default: 'negative'}
  }
);
const emits = defineEmits(['update:modelValue']);

const elementValue = computed({
  get: () => props.modelValue, set: (value) => emits('update:modelValue', value)
})
const errorMessage = ref('Bitte eine Auswahl treffen')

const selectedValue = ref('')
const checkError = () => {
  if (props.checkError) {
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


const onSelect = (elementKey) => {
  if(selectedValue.value !== elementKey){
    selectedValue.value = elementKey
  } else {
    selectedValue.value = ''
  }
  emits('update:modelValue', selectedValue.value)
  checkError()

};

onMounted(() => {
  selectedValue.value = props.modelValue
  checkError()

})

</script>
