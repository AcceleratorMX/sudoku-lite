import Cell from "./Cell";

export default {
  title: "Game/Cell",
  component: Cell,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A single cell in the Sudoku grid. Handles user input validation " +
          "(only digits 1-9 allowed), applies visual styling for 3×3 box borders, " +
          "read-only pre-filled cells, and disabled states. " +
          "This is the core interactive element of the game.",
      },
    },
  },
  argTypes: {
    value: {
      control: "text",
      description: "Current cell value (1-9 or empty string)",
      table: {
        defaultValue: { summary: '""' },
      },
    },
    isEditable: {
      control: "boolean",
      description: "Whether the cell can be edited by the player. Pre-filled cells are not editable.",
      table: {
        defaultValue: { summary: true },
      },
    },
    disabled: {
      control: "boolean",
      description: "Whether the cell is disabled (e.g., when the game is paused or completed)",
      table: {
        defaultValue: { summary: false },
      },
    },
    rowIndex: {
      control: { type: "number", min: 0, max: 8 },
      description: "Row position in the grid (0-8). Affects thick border rendering at 3×3 boundaries.",
      table: {
        defaultValue: { summary: 0 },
      },
    },
    colIndex: {
      control: { type: "number", min: 0, max: 8 },
      description: "Column position in the grid (0-8). Affects thick border rendering at 3×3 boundaries.",
      table: {
        defaultValue: { summary: 0 },
      },
    },
    onChange: {
      action: "changed",
      description: "Callback fired when the cell value changes: (rowIndex, colIndex, newValue)",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "20px", background: "#f8f9fa" }}>
        <Story />
      </div>
    ),
  ],
};

/** Empty editable cell — the default state when a player starts a new game. */
export const Empty = {
  args: {
    value: "",
    isEditable: true,
    rowIndex: 0,
    colIndex: 0,
    id: "cell-0-0",
  },
};

/** Editable cell with a value — represents a player-entered number. */
export const WithValue = {
  args: {
    value: "5",
    isEditable: true,
    rowIndex: 1,
    colIndex: 1,
    id: "cell-1-1",
  },
};

/** Pre-filled (read-only) cell — a number that was part of the original puzzle. */
export const PreFilled = {
  args: {
    value: "8",
    isEditable: false,
    rowIndex: 0,
    colIndex: 0,
    id: "cell-prefilled",
  },
};

/** Disabled cell — appears when the game is paused or completed. */
export const Disabled = {
  args: {
    value: "3",
    isEditable: true,
    disabled: true,
    rowIndex: 0,
    colIndex: 0,
    id: "cell-disabled",
  },
};

/** Cell at 3×3 boundary — demonstrates the thick bottom and right borders. */
export const AtBoxBoundary = {
  args: {
    value: "7",
    isEditable: true,
    rowIndex: 2,
    colIndex: 2,
    id: "cell-boundary",
  },
};

/** Mini grid — shows a 3×3 section of cells to demonstrate border styling. */
export const MiniGrid = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 45px)",
        gap: 0,
        border: "2px solid #333",
      }}
    >
      {[0, 1, 2].flatMap((row) =>
        [0, 1, 2].map((col) => (
          <Cell
            key={`${row}-${col}`}
            value={row === 1 && col === 1 ? "5" : ""}
            isEditable={!(row === 0 && col === 0)}
            rowIndex={row}
            colIndex={col}
            id={`cell-${row}-${col}`}
            onChange={() => {}}
          />
        ))
      )}
    </div>
  ),
};
