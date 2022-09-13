<template>
  <div>
    <table :style="cssColor()" class="dataGrid">
      <tr>
        <th><h4>#</h4></th>
        <th><h4>Процесс</h4></th>
        <th><h4>Куда переходит</h4></th>
      </tr>
      <tr v-for="(state, stateIndex) in data.states" :key="stateIndex">
        <td>{{ stateIndex + 1 }}</td>
        <td>{{ state }}</td>
        <td>
          <span
            v-for="(col, colIndex) in data.adjacencies[stateIndex]"
            :key="colIndex"
          >
            <div class="process-tag" v-if="col === true">
              <span
                >{{ colIndex + 1 }}-{{ data.states[colIndex] }}
                <button
                  @click="handleDelElemClick(stateIndex, colIndex)"
                  class="del-elem-btn"
                >
                  &times;
                </button></span
              >
            </div>
          </span>
        </td>
        <td>
          <button @click="handleOpenClose(stateIndex)" class="add-conn-row-btn">
            &plus;
          </button>
          <DropDownMenu
            v-if="isDropDownOpen && selectedRowIndex === stateIndex"
            :data="data"
            :selectedRowIndex="selectedRowIndex"
            @createConnectionEvent="handleCreateConnection"
          />
        </td>
        <td>
          <button @click="handleDelRowClick(stateIndex)" class="del-row-btn">
            &times;
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
export default {
  name: "TableVisualization",
};
</script>

<script setup lang="ts">
import { defineProps, defineEmits, ref, computed } from "vue";
import { IInputData } from "@/interfaces/IInputData";
import { cssColor } from "../composables/cssColor";
import DropDownMenu from "./DropDownMenu.vue";

const props = defineProps<{
  data: IInputData;
}>();

const emit = defineEmits([
  "delProcessEvent",
  "delConnectionEvent",
  "createConnectionEvent",
]);
const handleDelRowClick = (index: number) => {
  emit("delProcessEvent", index);
};
const handleDelElemClick = (rowI: number, colI: number) => {
  emit("delConnectionEvent", rowI, colI);
};

const isDropDownOpen = ref(false);
const selectedRowIndex = ref(0);
const handleOnOthersClick = () => {
  console.log("set false");
  isDropDownOpen.value = false;
};
const handleOpenClose = (index: number) => {
  isDropDownOpen.value = !isDropDownOpen.value;
  if (isDropDownOpen.value) selectedRowIndex.value = index;
};

const handleCreateConnection = (to: number) => {
  isDropDownOpen.value = false;
  emit("createConnectionEvent", selectedRowIndex.value, to); //,,
};
</script>

<style scoped>
.dataGrid table {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}

table {
  border: 0.05rem solid lightgray;
  border-collapse: collapse;
}

tr {
  transition: ease-in-out 0.4s;
}

tr:hover td {
  background: rgba(128, 128, 128, 0.1);
  transition: ease-in-out 0.4s;
}

th {
  border: 0.05rem solid lightgray;
  padding: 0.5rem;
  background: #f2f2f290;
  color: rgba(29, 29, 29, 0.99);
  transition: ease-in-out 0.4s;
}

td {
  border: 0.05rem solid lightgray;
  padding: 0.5em;
}

/* del btns */
.del-row-btn {
  background: transparent;
  border: none;
  font-size: 1.8em;
  font-weight: bold;
  color: lightcoral;
}

.del-row-btn:hover {
  color: red;
  cursor: pointer;
}

.add-conn-row-btn {
  background: transparent;
  border: none;
  font-size: 1.8em;
  font-weight: bold;
  color: limegreen;
}

.add-conn-row-btn:hover {
  color: green;
  cursor: pointer;
}

.del-elem-btn {
  background: transparent;
  border-radius: 25px;
  border: none;
  font-size: 1.1em;
  font-weight: bold;
  color: gray;
  vertical-align: -1px;
}

.del-elem-btn:hover {
  color: red;
  cursor: pointer;
}

.process-tag {
  margin: 7px;
  align-content: center;
  align-items: center;
  vertical-align: middle;
}

.process-tag span {
  background: rgb(227, 227, 227);
  border: 1px solid gray;
  padding: 2px;
  padding-left: 5px;
  padding-right: 5px;
  border-radius: 25px;
}
</style>