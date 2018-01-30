export const BOARD_SIZE = 10;

enum Direction {
  Left = 'LEFT',
  Right = 'RIGHT',
  Up = 'UP',
  Down = 'DOWN'
}

interface ICoordinate {
  x: number;
  y: number;
}

/**
 * Direction->Coordinate relationship. Uses web browser tradition of `x` moves
 * in rightward horizontal direction and `y` moves in downward vertical
 * direction. (`-x` moves leftward horizontal, and `-y` moves upward vertical.)
 */
function deltaCoordOf(d: Direction): ICoordinate {
  switch (d) {
    case Direction.Up:
      return { x: 0, y: -1 };
    case Direction.Down:
      return { x: 0, y: 1 };
    case Direction.Left:
      return { x: -1, y: 0 };
    case Direction.Right:
      return { x: 1, y: 0 };
  }
}

interface IFood {
  value: number;
  symbol: string;
  coordinate: ICoordinate;
}

class Food implements IFood {
  coordinate: ICoordinate;
  value: number;
  symbol: string;
  constructor(coordinate: ICoordinate) {
    this.coordinate = coordinate;
  }
}

export class Cheese extends Food {
  coordinate: ICoordinate;
  value: number;
  constructor(coordinate: ICoordinate) {
    super(coordinate);
    this.value = 1;
    this.symbol = '*';
  }
}

interface IThing {
  coordinate: ICoordinate;
  symbol: string;
}

class Thing implements IThing {
  coordinate: ICoordinate;
  symbol: string;
  constructor(coordinate: ICoordinate) {
    this.coordinate = coordinate;
  }
}

export class Monster extends Thing {
  constructor(coordinate: ICoordinate) {
    super(coordinate);
    this.symbol = 'm';
  }
}

interface IBoard {
  things: Thing[];
  food: Food[];
  board: (Food | Thing | undefined)[][];

  place(food: Food): void;
  move(thing: Thing, direction: Direction): void;
}

class OutOfBound {
  item: Object;
  name: string;
  constructor(item: Object) {
    this.item = item;
    this.name = 'Out of bounds';
    console.log(this.name, 'Exception');
  }
}

class BadPlacement {
  isThereItem: Object | undefined; // If it's undefined, then we called the exception wrong...
  wantToPlaceItem: Object;
  name: string;
  constructor(isThereItem: Object | undefined, wantToPlaceItem: Object) {
    this.isThereItem = isThereItem;
    this.wantToPlaceItem = wantToPlaceItem;
    this.name = 'Placement taken by something';
    console.log(this.name, 'Exception');
  }
}

export class GameBoard implements IBoard {
  things: Thing[];
  food: Food[];
  board: (Food | Thing | undefined)[][];

  constructor(things: Thing[], food: Food[]) {
    this.things = things;
    this.food = food;
    this.board = [];

    for (let i = 0; i < BOARD_SIZE; i++) {
      this.board.push(new Array<undefined>(BOARD_SIZE).fill(undefined));
    }

    // place things on board
    for (let t of this.things) {
      let { x, y } = t.coordinate;
      if (this.board[x][y] !== undefined) {
        throw new BadPlacement(this.board[x][y], t);
      }
      this.board[x][y] = t;
    }
    // place food on board
    for (let f of this.food) {
      let { x, y } = f.coordinate;
      if (this.board[x][y] !== undefined) {
        throw new BadPlacement(this.board[x][y], f);
      }
      this.board[x][y] = f;
    }

    // Other Exceptions
    for (let f of this.food) {
      if (f.coordinate.x > BOARD_SIZE || f.coordinate.y > BOARD_SIZE) {
        throw new OutOfBound(f);
      }
    }
    for (let t of this.things) {
      if (t.coordinate.x > BOARD_SIZE || t.coordinate.y > BOARD_SIZE) {
        throw new OutOfBound(t);
      }
    }
  }

  place(food: Food): void {}

  /* Tests coordinate on the board for something */
  hasBoard(c: ICoordinate): boolean {
    const { x, y } = c;
    return this.board[x][y] !== undefined;
  }

  move(t: Thing, d: Direction): void {
    const delta = deltaCoordOf(d);
    t.coordinate = {
      x: t.coordinate.x + delta.x,
      y: t.coordinate.y + delta.y
    };
  }
}
