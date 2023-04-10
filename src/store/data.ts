import { defineStore } from "pinia";
import { ref, watch } from "vue";

export type DataType = {
  id: number;
  comp: string;
  component: string;
  props: { text: string; message?: string };
};

export const useDataStore = defineStore("data", () => {
  const data = ref<DataType[]>([]);
  const active = ref<DataType | any>();

  if (localStorage.getItem("data")) {
    data.value = JSON.parse(localStorage.getItem("data") || "{}");
  }

  watch(
    data,
    (dataVal: DataType[]) => {
      localStorage.setItem("data", JSON.stringify(dataVal));
    },
    {
      deep: true,
    }
  );

  const addData = (payload: DataType) => {
    data.value = [...data.value, payload];
  };

  const reset = () => {
    data.value = [];
    active.value = null;
  };

  const setActive = (payload: DataType) => {
    active.value = payload;
  };

  return { data, addData, reset, active, setActive };
});
