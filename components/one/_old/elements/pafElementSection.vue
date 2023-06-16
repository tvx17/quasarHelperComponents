<template>
  <div class="text-overline">
    <div class="row">
      <div class="col text-h6">
        {{ props.label }}
      </div>
    </div>
  </div>

</template>

<script setup>
const props = defineProps(
  {
    label: {required: true, type: String},
  }
);
</script>
