import AppStyles from "./App.module.css";
import StartPageStyles from "./pages/Start.module.css";
import GamePageStyles from "./pages/Game.module.css";
import ScoresPageStyles from "./pages/Scores.module.css";

// Common components
import ButtonStyles from "./components/common/Button.module.css";
import CookieConsentStyles from "./components/common/CookieConsent.module.css";

// Form components
import DifficultyStyles from "./components/forms/Difficulty.module.css";
import StartFormStyles from "./components/forms/StartForm.module.css";

// Leaderboard components
import ScoresListStyles from "./components/leaderboard/ScoresList.module.css";
import PlayerStyles from "./components/leaderboard/Player.module.css";

// Game components
import CellStyles from "./components/game/Cell.module.css";
import GridStyles from "./components/game/Grid.module.css";
import SudokuGameStyles from "./components/game/SudokuGame.module.css";
import GameCompletionDialogStyles from "./components/game/GameCompletionDialog.module.css";

export const App = AppStyles;

export const pages = {
  Start: StartPageStyles,
  Game: GamePageStyles,
  Scores: ScoresPageStyles,
};

export const components = {
  common: {
    Button: ButtonStyles,
    CookieConsent: CookieConsentStyles,
  },
  forms: {
    Difficulty: DifficultyStyles,
    StartForm: StartFormStyles,
  },
  leaderboard: {
    ScoresList: ScoresListStyles,
    Player: PlayerStyles,
  },
  game: {
    Cell: CellStyles,
    Grid: GridStyles,
    SudokuGame: SudokuGameStyles,
    GameCompletionDialog: GameCompletionDialogStyles,
  },
};

export const { Button, CookieConsent } = components.common;

export const { Difficulty, StartForm } = components.forms;

export const { ScoresList, Player } = components.leaderboard;

export const { Cell, Grid, SudokuGame, GameCompletionDialog } = components.game;

export const { Start, Game, Scores } = pages;

export default {
  App,
  pages,
  components,
};
