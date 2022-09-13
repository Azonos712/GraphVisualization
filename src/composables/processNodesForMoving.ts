import { ITableStructure } from "../interfaces/ITableStructure";
import { ICell } from "../interfaces/ICell";

export const processNodesForMoving = (table: ITableStructure) => {
  const processedNodesPoint = {
    x: -1,
    y: -1,
  };

  const protectedAreaPoint = {
    x: -2,
    y: table.rows.length - 1,
  };

  for (let i = 0; i < table.rows.length; i++) {
    const cellWithNode = getNodeByRow(i, table);
    if (isPossibleToMoveRight(cellWithNode!, table)) {
      movePositionsToRight(
        cellWithNode!,
        table,
        processedNodesPoint,
        protectedAreaPoint
      );
      processedNodesPoint.y += 1;
    } else {
      processedNodesPoint.x += 1;
      processedNodesPoint.y += 1;
      protectedAreaPoint.x += 1;
    }
  }
};

const getNodeByRow = (rowIndex: number, table: ITableStructure) => {
  return table.rows[rowIndex].cells?.find((pos) => pos.node);
};

const getNodeIndexByRow = (rowIndex: number, table: ITableStructure) => {
  return table.rows[rowIndex].cells?.find((pos) => pos.node)?.x;
};

const isPossibleToMoveRight = (cellWithNode: ICell, table: ITableStructure) => {
  return (
    cellWithNode.x !== 0 &&
    table.rows[cellWithNode.y].cells![cellWithNode.x - 1].line
      ?.isVerticalLine !== true &&
    cellWithNode.node?.isInTop !== true
  );
};

const movePositionsToRight = (
  cellWithNode: ICell,
  table: ITableStructure,
  procArea: { x: number; y: number },
  protArea: { x: number; y: number }
) => {
  for (let i = 0; i < table.rows.length; i++) {
    for (let j = 0; j < table.rows[i].cells!.length; j++) {
      const currentPos = {
        x: j,
        y: i,
      };

      if (
        (currentPos.x > procArea.x || currentPos.y > procArea.y) &&
        currentPos.x > protArea.x
      ) {
        if (currentPos.x === table.rows[currentPos.y].cells!.length - 1) {
          table.rows[currentPos.y].cells!.pop();
        } else {
          table.rows[currentPos.y].cells![currentPos.x] = JSON.parse(
            JSON.stringify(table.rows[currentPos.y].cells![currentPos.x + 1])
          );
          table.rows[currentPos.y].cells![currentPos.x].x -= 1;
        }

        if (
          currentPos.x === cellWithNode.x - 1 &&
          currentPos.y === cellWithNode.y
        ) {
          if (
            table.rows[currentPos.y].cells![currentPos.x].node
              ?.isDiagonalLeftTopIn === true
          ) {
            table.rows[currentPos.y].cells![
              currentPos.x
            ].node!.isDiagonalLeftTopIn = false;
            table.rows[currentPos.y].cells![currentPos.x].node!.isInTop = true;

            const prevNodeIndex = getNodeIndexByRow(currentPos.y - 1, table);
            table.rows[currentPos.y - 1].cells![
              prevNodeIndex!
            ].node!.isDiagonalRightBottomOut = false;
            table.rows[currentPos.y - 1].cells![
              prevNodeIndex!
            ].node!.isOutBottom = true;
          }

          if (
            table.rows[currentPos.y].cells![currentPos.x].node
              ?.isDiagonalLeftTopOut === true
          ) {
            table.rows[currentPos.y].cells![
              currentPos.x
            ].node!.isDiagonalLeftTopOut = false;
            table.rows[currentPos.y].cells![currentPos.x].node!.isOutTop = true;

            const prevNodeIndex = getNodeIndexByRow(currentPos.y - 1, table);
            table.rows[currentPos.y - 1].cells![
              prevNodeIndex!
            ].node!.isDiagonalRightBottomIn = false;
            table.rows[currentPos.y - 1].cells![
              prevNodeIndex!
            ].node!.isInBottom = true;
          }
        }
      }
    }
  }
};
