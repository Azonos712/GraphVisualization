<template>
  <div>
    <table :style="cssColor()">
      <tr v-for="(row, rowIndex) in computedTable.rows" :key="rowIndex">
        <th>{{ row.title }}</th>
        <td v-for="(cell, cellIndex) in row.cells" :key="cellIndex">
          <div :class="{ 'node-holder': cell.node }" v-if="cell.node">
            <div class="left-top-corner">
              <img
                src="../assets/arrow-2.svg"
                alt="arrow"
                class="arrow"
                :class="{
                  hidden: cell.node.isDiagonalLeftTopIn !== true,
                  'diagonal-top-incoming-arrow':
                    cell.node.isDiagonalLeftTopIn === true,
                }"
              />
              <!-- 
                  'diagonal-line': cell.node.isDiagonalLeftTopOut, -->
              <img
                src="../assets/diagonalLine.svg"
                alt="line"
                :class="{
                  hidden:
                    cell.node.isDiagonalLeftTopOut !== true ||
                    cell.node.isDiagonalLeftTopIn === true,
                }"
                class="line-out"
              />
            </div>
            <div class="top">
              <img
                src="../assets/arrow.svg"
                alt="arrow"
                class="arrow bottom-node"
                :class="{ hidden: cell.node.isInTop !== true }"
              />
              <img
                src="../assets/line.svg"
                alt="arrow"
                class="vertical-line-node"
                :class="{ hidden: cell.node.isOutTop !== true }"
              />
            </div>
            <div class="right-top-corner hidden"></div>
            <div class="left" :class="{ hidden: cell.node.isOutLeft !== true }">
              <img src="../assets/line.svg" alt="arrow" class="line" />
            </div>
            <div class="node">
              <div></div>
            </div>
            <div
              class="right"
              :class="{ hidden: cell.node.isOutRight !== true }"
            >
              <img src="../assets/line.svg" alt="arrow" class="line" />
            </div>
            <div class="left-bottom-corner"></div>
            <div class="bottom">
              <img
                src="../assets/arrow.svg"
                alt="arrow"
                class="arrow bottom-node"
                :class="{ hidden: cell.node.isInBottom !== true }"
              />
              <img
                src="../assets/line.svg"
                alt="arrow"
                class="vertical-line-node"
                :class="{ hidden: cell.node.isOutBottom !== true }"
              />
            </div>
            <div class="right-bottom-corner">
              <img
                src="../assets/arrow-2.svg"
                alt="arrow"
                class="arrow"
                :class="{
                  hidden: cell.node.isDiagonalRightBottomIn !== true,
                  'incoming-right-bottom-corner':
                    cell.node.isDiagonalRightBottomIn,
                }"
              />
                <!--line diagonal-line-->
              <img
                src="../assets/diagonalLine.svg"
                alt="arrow"
                class="line " 
                :class="{
                  hidden:
                    cell.node.isDiagonalRightBottomOut !== true ||
                    cell.node.isDiagonalRightBottomIn === true,
                }"
              />
            </div>
          </div>
          <div
            v-else
            class="arc-holder"
            :class="{
              corner: cell.corner && cell.corner.isRightTopCorner,
              'revert-corner': cell.corner && !cell.corner.isRightTopCorner,
              'horizontal-line': cell.line && cell.line.isHorizontalLine,
              'vertical-line': cell.line && cell.line.isVerticalLine,
            }"
          >
            <div class="left-top"></div>
            <div class="right-top"></div>
            <div class="left-bottom"></div>
            <div class="right-bottom"></div>
          </div>
        </td>
      </tr>
    </table>
  </div>
  <!-- <p>{{ props.data }}</p> -->
</template>

<script lang="ts">
export default {
  name: "GraphVisualization",
};
</script>

<script setup lang="ts">
import { computed, defineProps, Ref, watch } from "vue";
import { ITableStructure } from "../interfaces/ITableStructure";
import { ITableRow } from "../interfaces/ITableRow";
import { ICell } from "../interfaces/ICell";
import { IInputData } from "../interfaces/IInputData";
import { fillNodesAndCorners } from "../composables/fillNodesAndCorners";
import { fillLines } from "../composables/fillLines";
import { fillDiagonals } from "../composables/fillDiagonals";
import { processNodesForMoving } from "../composables/processNodesForMoving";
import { cssColor } from "../composables/cssColor";

const props = defineProps<{
  data: IInputData;
}>();
// const props = defineProps({
//   data: Ref<IInputData>
// });

const computedTable = computed(() => {
  const tableStructure = fillNodesAndCorners(props.data);
  fillLines(tableStructure);
  fillDiagonals(tableStructure);
  processNodesForMoving(tableStructure);
  return tableStructure;
});

console.log("table", computedTable);
</script>


<style scoped>
* {
  margin: 0;
  padding: 0;
  font-family: "Arial Narrow", sans-serif;
  font-size: medium;
  font-weight: 200;
}

/*:root {*/
/*  --background-color: red;*/
/*}*/
/*
grey #e1e2e5
dark blue #4981fd

*/
table {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}

table,
th {
  border: 0.05rem solid lightgrey;
  border-collapse: collapse;
}

th {
  padding: 0.5rem;
  background: #f2f2f2;
  color: rgba(29, 29, 29, 0.99);
  transition: ease-in-out 0.4s;
}

tr:hover th {
  background: rgba(0, 0, 0, 0.3);
  transition: ease-in-out 0.4s;
}

tr:hover {
  background: rgba(0, 0, 0, 0.1);
  transition: ease-in-out 0.4s;
}

td {
  height: 4rem;
  width: 4rem;
}

tr {
  transition: ease-in-out 0.4s;
}

.node-holder {
  display: grid;
  width: 4rem;
  height: 4rem;
  grid-template-columns: repeat(4, 25%);
  grid-template-rows: repeat(4, 25%);
  grid-template-areas:
    "left-top-corner top top right-top-corner"
    "left node node right"
    "left node node right"
    "left-bottom-corner bottom bottom right-bottom-corner";
  box-sizing: border-box;
}

.node {
  grid-area: node;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}

.node div {
  height: 50%;
  width: 50%;
  border: 5px solid #3353e8;
  border-radius: 50%;
  background: #3353e8;
  display: inline-block;
  box-sizing: border-box;
}

.right-top-corner {
  grid-area: right-top-corner;
}

.top,
.bottom {
  display: flex;
  justify-content: center;
  align-items: stretch;
}

.top {
  grid-area: top;
  position: relative;
}

.arrow {
  height: 100%;
}

.top .arrow {
  transform: rotate(180deg);
}

.left-top-corner {
  grid-area: left-top-corner;
}

.left {
  grid-area: left;
}

.right,
.left {
  display: flex;
  align-items: stretch;
  justify-content: center;
}

.right {
  grid-area: right;
}

.left-bottom-corner {
  grid-area: left-bottom-corner;
}

.bottom {
  grid-area: bottom;
  position: relative;
}

.right-bottom-corner {
  grid-area: right-bottom-corner;
}

.left-top-corner,
.right-top-corner,
.left-bottom-corner,
.right-bottom-corner {
  position: relative;
}

.left-top-corner img,
.right-top-corner img,
.left-bottom-corner img,
.right-bottom-corner img {
  position: absolute;
  top: 0;
  left: 0;
}

.arc-holder {
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(2, 50%);
  grid-template-rows: repeat(2, 50%);
  grid-template-areas: "left-top right-top" "left-bottom right-bottom";
  gap: 0;
}

.left-top {
  grid-area: left-top;
}

.right-top {
  grid-area: right-top;
}

.left-bottom {
  grid-area: left-bottom;
}

.right-bottom {
  grid-area: right-bottom;
}

.corner .left-top {
  border-bottom: 1px #9f9f9f solid;
}

.corner .left-bottom {
  border-top: 1px #9f9f9f solid;
  border-right: 1px #9f9f9f solid;
}

.corner .right-bottom {
  border-left: 1px #9f9f9f solid;
}

.revert-corner .left-top {
  border-right: 1px #9f9f9f solid;
}

.revert-corner .right-top {
  border-bottom: 1px #9f9f9f solid;
  border-left: 1px #9f9f9f solid;
}

.revert-corner .right-bottom {
  border-top: 1px #9f9f9f solid;
}

.horizontal-line .left-bottom,
.horizontal-line .right-bottom {
  border-top: 1px #9f9f9f solid;
}

.horizontal-line .right-top,
.horizontal-line .left-top {
  border-bottom: 1px #9f9f9f solid;
}

.vertical-line .right-bottom,
.vertical-line .right-top {
  border-left: 1px #9f9f9f solid;
}

.vertical-line .left-top,
.vertical-line .left-bottom {
  border-right: 1px #9f9f9f solid;
}

.hidden {
  visibility: hidden;
}

.incoming-right-bottom-corner {
}

.diagonal-top-incoming-arrow {
  width: 1rem;
  transform: rotate(180deg);
  z-index: 2;
}

.diagonal-bottom-incoming-arrow {
  width: 1rem;
  transform: rotate(180deg);
}

.diagonal-line {
  transform: rotate(45deg);
}

.bottom-node,
.vertical-line-node {
  height: 1rem;
  position: absolute;
  top: 0;
  left: calc(50% - 0.5rem);
}

.vertical-line-node {
  transform: rotate(90deg);
}
</style>