import AppRouter from "./components/AppRouter";
import "./assets/css/style.css";
import { useAutoLogout } from "./hooks/useAutoLogout";

export default function App() {
  useAutoLogout();

  return <AppRouter />;
}
