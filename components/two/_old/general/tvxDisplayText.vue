<template>
<div class="row">
  <div :class="firstColumnWidth">{{props.label}}:</div>
  <div class="col">{{props.usernameOrEmail}}</div>
</div>
</template>

<script setup>
import {firstColumnWidth} from 'src/app/definitions';

const props = defineProps(
  {
    label: {type: String, default: 'Löschen'},
    value:{}
  });
</script>
