<script setup lang="ts">
import { useDataStore } from "../store/data";
import { storeToRefs } from "pinia";

const store = useDataStore();
const { data } = storeToRefs(store);

const alertMes = (mes: string | undefined) => {
  if (mes) {
    alert(mes);
  } else return;
};
</script>

<template>
  <div class="flex items-center justify-center mt-5">
    <div class="flex flex-col gap-4">
      <div
        class="flex-col justify-center items-center"
        v-for="item in data"
        :key="item.id"
      >
        <button
          v-if="item.comp === 'btn'"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 text-sm rounded"
          @click="alertMes(item.props.message)"
        >
          {{ item.props.text ? item.props.text : "Button" }}
        </button>
        <p v-else class="cursor-pointer">
          {{ item.props.text ? item.props.text : "paragraph" }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
