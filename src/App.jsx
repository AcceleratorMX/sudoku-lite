import { App as styles } from "./css";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <div className={styles.app}>
      <AppRouter />
    </div>
  );
}

export default App;
