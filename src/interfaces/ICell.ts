export interface ICell {
  x: number;
  y: number;
  node?: INode;
  corner?: ICorner;
  line?: ILine;
}

export interface INode {
  isOutRight?: boolean;
  isInTop?: boolean;
  isOutLeft?: boolean;
  isInBottom?: boolean;
  isDiagonalRightBottomIn?: boolean;
  isDiagonalRightBottomOut?: boolean;
  isDiagonalLeftTopIn?: boolean;
  isDiagonalLeftTopOut?: boolean;
  isOutBottom?:boolean;
  isOutTop?:boolean;
}

export interface ICorner {
  isRightTopCorner?: boolean;
}

export interface ILine {
  isHorizontalLine?: boolean;
  isVerticalLine?: boolean;
}
