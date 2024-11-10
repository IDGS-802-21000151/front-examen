import { createRoot } from "react-dom/client";
import { PrimeReactProvider } from "primereact/api";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./css/index.css";

import "primereact/resources/themes/lara-light-blue/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import axios from "axios";

import Inicio from "./pages/Inicio";
import Resultados from "./pages/Resultados";
import { ToastProvider } from "./contexts/ToastContext";
import Sales from "./pages/Sales";
import Producto from "./pages/Producto";
import ReloadPrompt from "./ReloadPrompt.tsx";

axios.defaults.baseURL = "https://servidor-examen.onrender.com/api";

createRoot(document.getElementById("root")!).render(
  <PrimeReactProvider>
    <ToastProvider>
      <BrowserRouter>
        <ReloadPrompt />

        <Routes>
          <Route path="/" Component={() => <Inicio />} />
          <Route path="/items" Component={() => <Resultados />} />
          <Route path="/items/:id" Component={() => <Producto />} />
          <Route path="/sales" Component={() => <Sales />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  </PrimeReactProvider>
);
