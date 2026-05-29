import { NotebookPen, Code, Siren, Flame } from "lucide-react";
import { Modes } from "./types";

export const modes: Modes[] = [
  {
    id: "explicacion",
    label: "Explicación",
    icon: NotebookPen,
    desc: "Explica el código paso a paso.",
  },
  {
    id: "refactorizacion",
    label: "Refactorización",
    icon: Code,
    desc: "Optimiza y limpia tu código.",
  },
  {
    id: "seguridad",
    label: "Seguridad",
    icon: Siren,
    desc: "Detecta vulnerabilidades.",
  },
  {
    id: "roast",
    label: "Roast My Code",
    icon: Flame,
    desc: "Crítica ácida y honesta",
  },
];

export const loadingMessages = [
  "Buscando los bugs que dejaste ahí a propósito...",
  "Consultando a mis abogados antes de criticar este código...",
  "Esto va a doler, pero por tu bien...",
  "Analizando la catástrofe... espera un poco.",
  "¿En serio escribiste esto? Dame un segundo para procesarlo.",
  "Calculando cuántas tazas de café necesitaste para esto...",
  "Desempolvando mi paciencia...",
  "Encontrando errores que ni el compilador sospecha.",
];
