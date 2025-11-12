import AppStyles from "./App.module.css";
import StartPageStyles from "./pages/Start.module.css";
import GamePageStyles from "./pages/Game.module.css";
import ScoresPageStyles from "./pages/Scores.module.css";

import ButtonStyles from "./components/ui/Button.module.css";
import DifficultyStyles from "./components/ui/Difficulty.module.css";
import StartFormStyles from "./components/ui/StartForm.module.css";
import ScoresListStyles from "./components/ui/ScoresList.module.css";
import PlayerStyles from "./components/ui/Player.module.css";
import GameCompletionDialogStyles from "./components/ui/GameCompletionDialog.module.css";

import CellStyles from "./components/game/Cell.module.css";
import GridStyles from "./components/game/Grid.module.css";
import SudokuGameStyles from "./components/game/SudokuGame.module.css";

export const App = AppStyles;

export const pages = {
  Start: StartPageStyles,
  Game: GamePageStyles,
  Scores: ScoresPageStyles,
};

export const components = {
  ui: {
    Button: ButtonStyles,
    Difficulty: DifficultyStyles,
    StartForm: StartFormStyles,
    ScoresList: ScoresListStyles,
    Player: PlayerStyles,
    GameCompletionDialog: GameCompletionDialogStyles,
  },
  game: {
    Cell: CellStyles,
    Grid: GridStyles,
    SudokuGame: SudokuGameStyles,
  },
};

export const {
  Button,
  Difficulty,
  StartForm,
  ScoresList,
  Player,
  GameCompletionDialog,
} = components.ui;

export const { Cell, Grid, SudokuGame } = components.game;

export const { Start, Game, Scores } = pages;

export default {
  App,
  pages,
  components,
};
