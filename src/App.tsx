import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import type { AppDispatch } from "./app/api/store";

import { refresh } from "./features/auth/authSlice";
import { initializeTheme } from "./features/theme/themeSlice";
import { initializeLanguage } from "./features/language/languageSlice";
import AppRouter from "./app/route/AppRouter";
import "./styles/index.css";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(refresh());
    dispatch(initializeTheme());
    dispatch(initializeLanguage());
  }, [dispatch]);

  return <AppRouter />;
}

export default App;
