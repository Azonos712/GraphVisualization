import { ITableStructure } from "../interfaces/ITableStructure";

export const fillDiagonals = (table: ITableStructure) => {
  for (let i = 0; i < table.rows.length - 1; i++) {
    const cell = table.rows[i].cells![i];
    const nextCell = table.rows[i + 1].cells![i + 1];

    if (
      table.rows[i].cells![i + 1].corner &&
      table.rows[i].cells![i + 1].corner?.isRightTopCorner === true
    ) {
      if (!table.rows[i].cells![i + 1].line?.isHorizontalLine) {
        cell.node!.isOutRight = false;
      }

      if (!table.rows[i].cells![i + 1].line?.isVerticalLine) {
        nextCell.node!.isInTop = false;
      }

      cell.node!.isDiagonalRightBottomOut = true;
      nextCell.node!.isDiagonalLeftTopIn = true;
      table.rows[i].cells![i + 1].corner = undefined;
    }

    if (
      table.rows[i + 1].cells![i].corner &&
      !(table.rows[i + 1].cells![i].corner?.isRightTopCorner === true)
    ) {
      if (!table.rows[i + 1].cells![i].line?.isVerticalLine) {
        cell.node!.isInBottom = false;
      }
      if (!table.rows[i + 1].cells![i].line?.isHorizontalLine) {
        nextCell.node!.isOutLeft = false;
      }
      cell.node!.isDiagonalRightBottomIn = true;
      nextCell.node!.isDiagonalLeftTopOut = true;
      table.rows[i + 1].cells![i].corner = undefined;
    }
  }
};
