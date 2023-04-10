<script setup lang="ts">
import { useMouse, useRefHistory } from "@vueuse/core";
import { ref } from "vue";
import { useDataStore } from "../store/data";
import { storeToRefs } from "pinia";

const store = useDataStore();

const { data, active } = storeToRefs(store);
const { addData, reset, setActive } = store;

const { x, y } = useMouse();

const { undo, redo, canUndo, canRedo } = useRefHistory(data, {
  deep: true,
});

const component = ref([
  {
    id: "para",
    title: "Paragraph",
  },
  { id: "btn", title: "Button" },
]);

const startDrag = (event: any, item: string) => {
  event.dataTransfer.dropEffect = "move";
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("itemID", item);
};

const onDrop = (event: any) => {
  const itemID = event.dataTransfer.getData("itemID");

  if (itemID === "btn") {
    addData({
      id: data.value.length,
      comp: "btn",
      component: "ElementButton",
      props: { text: "", message: "" },
    });
  } else {
    addData({
      id: data.value.length,
      comp: "para",
      component: "ElementParagraph",
      props: { text: "" },
    });
  }
};

const setAc = (item: any) => {
  setActive(item);
};
</script>

<template>
  <div class="wrapper">
    <header
      class="border-black border-b-[1px] flex justify-center items-center p-2"
    >
      <div class="flex justify-center items-center bg-red-500">
        <button class="text-white hover:bg-red-700 p-2 px-4">Save</button>
        <button
          :disabled="!canUndo"
          @click="undo()"
          class="text-white hover:bg-red-700 p-2 px-4"
        >
          Undo
        </button>
        <button
          :disabled="!canRedo"
          @click="redo()"
          class="text-white hover:bg-red-700 p-2 px-4"
        >
          Redo
        </button>
        <button @click="reset" class="text-white hover:bg-red-700 p-2 px-4">
          Reset
        </button>

        <router-link
          class="text-white hover:bg-red-700 p-2 px-4"
          to="/consumer"
          target="_blank"
          >View</router-link
        >
      </div>
    </header>

    <div class="flex w-full h-[100vh]">
      <nav class="border-black border-r-[1px] flex flex-col py-1">
        <div
          class="flex flex-col items-center justify-center gap-2 hover:bg-gray-200 p-5"
          v-for="item in component"
          :key="item.id"
          draggable="true"
          @dragstart="startDrag($event, item.id)"
        >
          <div class="border border-gray-400 w-10 h-10"></div>
          <p class="font-semibold">{{ item.title }}</p>
        </div>
      </nav>

      <main class="w-full">
        <div
          class="h-[80vh] p-2 flex w-full"
          @drop="onDrop($event)"
          @dragenter.prevent
          @dragover.prevent
        >
          <div class="flex-1">
            <div>
              <p>Mouse: ({{ x }}, {{ y }})</p>
            </div>
            <div>
              <p>Dragging</p>
            </div>
            <div>
              <p>Instances: {{ data.length }}</p>
            </div>
            <div>
              <p>Config: {{ active }}</p>
            </div>
          </div>
          <div class="flex-1">
            <div class="flex flex-col gap-4">
              <div
                class="flex-col justify-center items-center"
                v-for="item in data"
                :key="item.id"
                @click="setAc(item)"
              >
                <button
                  v-if="item.comp === 'btn'"
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 text-sm rounded"
                >
                  {{ item.props.text ? item.props.text : "Button" }}
                </button>
                <p v-else class="cursor-pointer">
                  {{ item.props.text ? item.props.text : "paragraph" }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="border-black border-t-[1px] p-4">
          <div v-if="active" class="flex flex-col gap-2">
            <p>
              <span v-if="active?.comp === 'para'">Paragraph</span>
              <span v-else>Button</span> Text
            </p>
            <input
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              type="text"
              v-model="active.props.text"
            />
            <p v-if="active?.comp === 'btn'">Alert Message</p>
            <input
              v-if="active?.comp === 'btn'"
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              type="text"
              v-model="active.props.message"
            />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped></style>
