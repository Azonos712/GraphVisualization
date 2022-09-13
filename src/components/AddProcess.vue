
<template>
  <div>
    <h3>Добавить новый процесс</h3>
    <input v-model="newProcess" type="text" />
    <br /><br />
    <button @click="handleClick">Добавить</button>
  </div>
</template>

<script lang="ts">
export default {
  name: "AddProcess",
};
</script>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from "vue";

const newProcess = ref("");
const emit = defineEmits(["addProcessEvent"]);
const handleClick = () => {
  emit("addProcessEvent", newProcess.value);
  newProcess.value = "";
};
</script>

<style>
</style>