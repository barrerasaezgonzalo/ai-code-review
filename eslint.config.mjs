import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // Aquí es donde defines las reglas globales para todo el proyecto
    // rules: {
    //   "react-hooks/exhaustive-deps": "off", // Apaga la advertencia de dependencias
    //   "react-hooks/rules-of-hooks": "error", // Esta es mejor dejarla encendida
    //   "react-hooks/set-state-in-effect": "off", // Apaga la advertencia de setState en useEffect
    // },
  },
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
