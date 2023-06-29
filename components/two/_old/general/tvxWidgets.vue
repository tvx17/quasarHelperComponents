<template>
  <div v-for="(widget, widgetIndex) in widgets" :key="widgetIndex">
    <div v-if="widget.type === 'datatableDisplay'">
      <paf-widget-data-display
        :request="widget.request"
        :table="widget.table"
        :headline="widget.title"
      />
    </div>
  </div>
</template>

<script setup>
// ********************************** Imports **********************************
// ********************** Vue **********************
import {onMounted} from "vue";
// ********************** Quasar **********************
// ********************** PAF **********************
import {widgets} from 'src/app/widgets'
import PafWidgetDataDisplay from "components/widgets/pafWidgetDataDisplay.vue";


// ********************************** Vue lifecycle hooks **********************************
onMounted(async () => {
})
</script>
