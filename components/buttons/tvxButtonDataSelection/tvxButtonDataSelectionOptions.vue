<template>
  <q-btn icon="fa-solid fa-arrow-down" size="sm" dense flat>
    <q-menu>
      <q-list style="min-width: 100px">
        <q-item clickable v-close-popup>
          <q-item-section>
            <div class="row">
              <div class="col">
                <q-icon name="fa-solid fa-plus" />
              </div>
              <div class="col">New</div>
            </div>
          </q-item-section>
        </q-item>
        <q-item clickable v-close-popup>
          <q-item-section>
            <div class="row">
              <div class="col">
                <q-icon name="fa-solid fa-pen" />
              </div>
              <div class="col">Edit</div>
            </div>
          </q-item-section>
        </q-item>
        <q-item :clickable="rowCount > 1" :v-close-popup="rowCount > 1" :disable="rowCount <= 1">
          <q-item-section>
            <div class="row">
              <div class="col">
                <q-icon name="fa-solid fa-trash" />
              </div>
              <div class="col">Delete</div>
            </div>
          </q-item-section>
        </q-item>

        <q-separator />
        <q-item :clickable="rowCount > 1" :v-close-popup="rowCount > 1" :disable="rowCount <= 1">
          <q-item-section>
            <div class="row">
              <div class="col">
                <q-icon name="fa-solid fa-hand-pointer" />
              </div>
              <div class="col">Select</div>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>
<script setup>
import { onMounted, ref } from "vue";
import crud from 'src/tvx/helper/crud';

const props = defineProps({
  datatable: {
    type: String,
    required: true,
    default: null,
  }
})

const rowCount = ref(0)

onMounted(async() => {
  await crud.readCount({destination: props.datatable}).then(count => {
    rowCount.value = count;
  });

});

</script>
