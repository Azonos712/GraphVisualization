<template>
  <section class="dropDownSection">
    <div v-for="(item, index) in possibleConnections" :key="index">
      <button @click="handleElementClick(item.index)" class="dropDownBtn">
        {{ item.index + 1 }}-{{ item.title }}
      </button>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  name: "DropDownMenu",
};
</script>

<script setup lang="ts">
import { computed, defineProps, defineEmits, Ref, watch } from "vue";
import { IInputData } from "@/interfaces/IInputData";

const props = defineProps<{
  selectedRowIndex: number;
  data: IInputData;
}>();

const possibleConnections = computed(() => {
  let output: { title: string; index: number }[] = [];
  props.data.adjacencies[props.selectedRowIndex].forEach((x, index) => {
    if (index !== props.selectedRowIndex && x === false)
      output.push({ title: props.data.states[index], index: index });
  });
  return output;
});

const emit = defineEmits(["createConnectionEvent"]);
const handleElementClick = (to: number) => {
  emit("createConnectionEvent", to);
};
</script>

<style>
.dropDownSection {
  background: rgb(227, 227, 227);
  border-radius: 16px;
  border: 1px solid gray;
  position: absolute;
  /* top: calc(100%+18px);
  left: 50%; */
  transform: translateX(-50%);
  width: max-content;
}

.dropDownBtn {
  background: transparent;
  border-radius: 12px;
  border: 1px solid gray;
  font-size: 1.1em;
  margin: 3px;
}

.dropDownBtn:hover {
  cursor: pointer;
  border: 1px solid black;
  font-size: 1.2em;
}
</style>