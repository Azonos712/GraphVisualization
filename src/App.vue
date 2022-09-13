<template>
  <div class="addPanel">
    <AddProcess @addProcessEvent="addProcess" />
  </div>
  <div class="container">
    <div>
      <TableVisualization
        class="tableVisual"
        v-bind:data="data"
        @delProcessEvent="delProcess"
        @delConnectionEvent="delConnection"
        @createConnectionEvent="createConnection"
      />
    </div>
    <div class="graphVisual">
      <GraphVisualisation v-bind:data="data" />
    </div>
  </div>

  <br /><br />
</template>

<script lang="ts">
import { computed, defineComponent, Ref } from "vue";
export default defineComponent({
  name: "App",
});
</script>

<script setup lang="ts">
import { ref } from "vue";
import { IInputData } from "./interfaces/IInputData";
import GraphVisualisation from "./components/GraphVisualization.vue";
import AddProcess from "./components/AddProcess.vue";
import TableVisualization from "./components/TableVisualization.vue";

const data: Ref<IInputData> = ref({
  states: [
    "ожидание",
    "подача колодок",
    "подача гармошки",
    "выгрузка пасссажиров",
    "выгрузка багажа",
    "уборка самолёта",
  ],
  adjacencies: [
    [false, false, false, true, false, false],
    [false, false, false, false, true, false],
    [false, true, false, true, false, false],
    [false, false, false, false, true, false],
    [false, false, false, false, false, true],
    [true, false, false, false, false, false],
  ],
});

const addProcess = (process: string) => {
  console.log(data.value);
  data.value.states.push(process);
  data.value.adjacencies.push(Array(data.value.states.length).fill(false));
  data.value.adjacencies.forEach((arr, index) => {
    if (index !== data.value.adjacencies.length - 1) {
      arr.push(false);
    }
  });
};

const createConnection = (from: number, to: number) => {
  //const fromIndex = data.value.states.indexOf(from);
  //const toIndex = data.value.states.indexOf(to);
  data.value.adjacencies[from][to] = true;
};

const delProcess = (index: number) => {
  data.value.states.splice(index, 1);
  data.value.adjacencies.splice(index, 1);
  data.value.adjacencies.forEach((arr) => arr.splice(index, 1));
};

const delConnection = (rowI: number, colI: number) => {
  data.value.adjacencies[rowI][colI] = false;
};

console.log('data', data)
</script>

<style >
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.addPanel {
  margin-left: 0em;
}

.container {
  margin: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tableVisual {
  margin: 2em;
}

.graphVisual {
  margin: 2em;
}
</style>
