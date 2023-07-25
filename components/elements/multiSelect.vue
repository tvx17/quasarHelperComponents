<template>
  <div class="text-overline">
    <div class="row">
      <div :class="'col-' + props.labelColumnWidth">
        {{ props.label }} - {{ props.modelValue }}
      </div>
      <div :class="'col-' + props.fieldColumnWidth">
        <div v-if="!optionsElement" class="text-weight-bolder text-negative">
          No selectable data was found or loaded! Options are
          {{ props.options }}
        </div>
        <div v-if="optionsElement">
          <q-select
            v-model="elementValue"
            :label="props.label"
            :options="optionsElement"
            multiple
            dense
            emit-value
            map-options
            :option-label="props.optionLabel"
            :option-value="props.optionValue"
            :disable="props.disable"
            :error-message="props.errorMessage !== '' ? props.errorMessage : ''"
            :error="props.errorMessage !== ''"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useI18n} from 'vue-i18n';
import {computed, onMounted, ref} from 'vue';
import {api} from 'boot/axios';
import crud, {crudModes} from 'src/tvx/helper/crud';

const {t} = useI18n();

const props = defineProps({
  modelValue: {required: true},
  label: {required: true, type: String},
  options: {required: true, type: [String, Array], default: ''},
  rules: {required: false, type: Array, default: () => []},
  errorMessage: {required: false, type: String, default: ''},
  disable: {required: false, type: Boolean, default: false},
  optionLabel: {required: false, type: String, default: 'name'},
  optionValue: {required: false, type: String, default: 'id'},
  labelColumnWidth: {required: false, type: Number, default: 3},
  fieldColumnWidth: {required: false, type: Number, default: 9},
});
const emits = defineEmits(['update:modelValue']);

const elementValue = computed({
  get: () => props.modelValue,
  set: (value) => emits('update:modelValue', value),
});

const optionsElement = ref([]);

const onClick = () => {
};

const loadOptionsData = async () => {
  const {data} = await api.get(props.optionsEndpoint);
  optionsElement.value = data;
};

onMounted(async () => {
  if (typeof props.options === 'string') {
    crud.r({destination: props.options, crudMode: crudModes.url}).then((result) => {
      optionsElement.value = result
    })
  } else {
    optionsElement.value = props.options;
  }
});
</script>
