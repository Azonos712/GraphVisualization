import { ref } from "vue";
import { IInputData } from "../interfaces/IInputData";
import { ITableStructure } from "../interfaces/ITableStructure";
import { ITableRow } from "@/interfaces/ITableRow";
import { ICell } from "@/interfaces/ICell";
import { INode, ICorner } from "../interfaces/ICell";

export const fillNodesAndCorners = (data: IInputData): ITableStructure => {
  const tableStructure: ITableStructure = { rows: [] };
  //console.log("data", data.states);
  for (let j = 0; j < data.states.length; j++) {
    const newRow: ITableRow = {
      title: data.states[j],
      cells: [],
    };

    const rowAdjacencies = data.adjacencies[j];
    for (let i = 0; i < data.states.length; i++) {
      const cell: ICell = {
        x: i,
        y: j,
      };

      if (i === j) cell.node = {};

      if (rowAdjacencies[i] === true) {
        cell.corner = {
          isRightTopCorner: i > j,
        };
      }

      //const isCorner = rowAdjacencies[i] === true;
      //let isRightTopCorner = false;
      // if (isCorner) {
      //   console.log("in");
      //   isRightTopCorner = i > j;
      //   console.log("isRightTopCorner", isRightTopCorner);
      // }

      // const cell: ICell = {
      //   x: i,
      //   y: j,
      //   isNode: isNode,
      //   isCorner: isCorner,
      //   isRightTopCorner: isRightTopCorner,
      //   //color: getColor(),
      // };
      newRow.cells?.push(cell);
    }
    tableStructure.rows.push(newRow);
  }

  return tableStructure;
};
