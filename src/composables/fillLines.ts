import { ITableStructure } from "../interfaces/ITableStructure";
import { ITableRow } from "../interfaces/ITableRow";
import { ICorner } from "../interfaces/ICell";

export const fillLines = (table: ITableStructure) => {
  table.rows.forEach((row) => {
    row.cells?.forEach((cell) => {
      if (cell.corner) {
        connectNodes(table, cell.x, cell.y, cell.corner.isRightTopCorner!);
      }
    });
  });
};

const connectNodes = (
  table: ITableStructure,
  x: number,
  y: number,
  isRightTopCorner: boolean
) => {
  if (isRightTopCorner) {
    for (let i = y + 1; i < x; i++) {
      if (!table.rows[y].cells![i].line) table.rows[y].cells![i].line = {};
      if (!table.rows[i].cells![x].line) table.rows[i].cells![x].line = {};
      table.rows[y].cells![i].line!.isHorizontalLine = true; //.rows[y]?.cells[i]?.isHorizontalLine = true;
      table.rows[i].cells![x].line!.isVerticalLine = true;
    }
    table.rows[x].cells![x].node!.isInTop = true;
    table.rows[y].cells![y].node!.isOutRight = true;
  } else {
    for (let i = x + 1; i < y; i++) {
      if (!table.rows[i].cells![x].line) table.rows[i].cells![x].line = {};
      if (!table.rows[y].cells![i].line) table.rows[y].cells![i].line = {};
      table.rows[i].cells![x].line!.isVerticalLine = true;
      table.rows[y].cells![i].line!.isHorizontalLine = true;
    }
    table.rows[x].cells![x].node!.isInBottom = true;
    table.rows[y].cells![y].node!.isOutLeft = true;
  }
};
