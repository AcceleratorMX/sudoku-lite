import { App as styles } from "./css";
import AppRouter from "./routes/AppRouter";
import { CookieConsent } from "./components";

function App() {
  return (
    <div className={styles.app}>
      <AppRouter />
      <CookieConsent />
    </div>
  );
}

export default App;
