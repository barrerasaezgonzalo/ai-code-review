# AI Core Review

Una plataforma profesional de auditoría de código impulsada por inteligencia artificial. **AI Core Review** analiza, documenta y mejora la calidad del código mediante IA, proporcionando retroalimentación detallada y recomendaciones de optimización.

---

## 🎯 Características Principales

- **Análisis Inteligente**: Evaluación profunda de código con múltiples modos de análisis
- **Interfaz Responsiva**: Experiencia de usuario moderna y accesible
- **Estado Centralizado**: Gestión eficiente del estado con Zustand
- **Tipado Fuerte**: Implementación completa de TypeScript
- **Monitoreo en Tiempo Real**: Feedback instantáneo durante el análisis

---

## 🏗️ Arquitectura

### Flujo de Datos Unidireccional

AI Core Review implementa un patrón de flujo de datos unidireccional basado en **Zustand** para asegurar previsibilidad y escalabilidad:

```
┌─────────────────────────────────────┐
│      React Components               │
│  (Analyze, CodeInput, Result)       │
└────────────────┬────────────────────┘
                 │ setCode(), setMode()
                 ▼
┌─────────────────────────────────────┐
│      Zustand Store (useStore)       │
│  ├─ code                            │
│  ├─ mode                            │
│  ├─ result                          │
│  ├─ isLoading                       │
│  └─ analyzeCode()                   │
└────────────────┬────────────────────┘
                 │ fetch("/api/analyze")
                 ▼
┌─────────────────────────────────────┐
│      API Backend (route.ts)         │
│  └─ POST /api/analyze               │
└─────────────────────────────────────┘
```

### Gestión de Estado con Zustand

El store centralizado `useStore` mantiene toda la lógica de estado:

```typescript
import { create } from "zustand";

export const useStore = create((set) => ({
  code: "",
  mode: "explicacion",
  result: "",
  isLoading: false,
  
  setCode: (newCode) => set({ code: newCode }),
  setMode: (newMode) => set({ mode: newMode }),
  
  analyzeCode: async (code, mode) => {
    set({ isLoading: true, result: "Analizando..." });
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        body: JSON.stringify({ code, mode }),
      });
      if (response.status === 404) {
        throw new Error("404_NOT_FOUND");
      }
      const data = await response.json();
      set({ result: data.result });
    } catch (error) {
      console.log(error);
      set({ result: "Error al analizar el código." });
    } finally {
      set({ isLoading: false });
    }
  },
}));
```

**Ventajas del enfoque:**
- ✅ Acciones asincrónicas manejadas de forma elegante
- ✅ Gestión de errores tipada (404 y excepciones)
- ✅ Estados de carga explícitos para feedback al usuario
- ✅ Cero re-renders innecesarios gracias a Zustand

---

## 🔧 Configuración Técnica

### ESLint

La configuración de ESLint está optimizada para proyectos Next.js con reglas específicas para evitar falsos positivos en patrones comunes:

### Monitoreo con useEffect

Los componentes de análisis utilizan `useEffect` sincronizado con estado de carga para monitoreo en tiempo real:

```typescript
import { useEffect, useRef } from "react";
import { useStore } from "@/store/useStore";

export function AnalysisStatus() {
  const { isLoading } = useStore();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isLoading) {
      intervalRef.current = setInterval(() => {
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isLoading]); 

  return <div className="status">{isLoading ? "Analizando..." : "Listo"}</div>;
}
```

**Patrones clave:**
- ✅ `clearInterval` en cleanup para evitar fugas de memoria
- ✅ Uso de `useRef` para referencias persistentes
- ✅ Callbacks funcionales para evitar closures anticuadas

---

## 📦 Stack Tecnológico

| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| **Next.js** | 16.2.6 | Framework React con App Router y SSR |
| **React** | 19.2.4 | Librería de componentes UI |
| **TypeScript** | ^5 | Tipado estático y seguridad de tipos |
| **Zustand** | ^5.0.14 | Gestión de estado ligera y performante |
| **Tailwind CSS** | ^4 | Framework de estilos utilitarios |
| **ESLint** | ^9 | Linting y calidad de código |
| **React Markdown** | ^10.1.0 | Renderizado de Markdown en resultados |
| **Rehype Highlight** | ^7.0.2 | Highlighting de código |
| **Lucide React** | ^1.3.0 | Iconos modernos |

---

## 📁 Estructura del Proyecto

```
ai-code-review/
├── app/                              # App Router de Next.js
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts              # Endpoint POST para análisis
│   ├── components/
│   │   ├── Analyze.tsx               # Componente principal de análisis
│   │   ├── CodeInput.tsx             # Editor de entrada de código
│   │   ├── Result.tsx                # Visualización de resultados
│   │   ├── AnalysisStatus.tsx        # Estado del análisis
│   │   ├── ModeList.tsx              # Selector de modos
│   │   ├── Modes.tsx                 # Catálogo de modos disponibles
│   │   └── Header.tsx                # Encabezado de la aplicación
│   ├── hooks/
│   │   └── usecopy.ts                # Hook para copiar al portapapeles
│   ├── store/
│   │   └── useStore.js               # Store centralizado con Zustand
│   ├── types.ts                      # Interfaces TypeScript globales
│   ├── constants.ts                  # Constantes de la aplicación
│   ├── layout.tsx                    # Layout raíz
│   ├── page.tsx                      # Página principal
│   └── globals.css                   # Estilos globales
├── public/                           # Archivos estáticos
├── eslint.config.mjs                 # Configuración de ESLint
├── next.config.ts                    # Configuración de Next.js
├── tsconfig.json                     # Configuración de TypeScript
├── tailwind.config.ts                # Configuración de Tailwind
├── postcss.config.mjs                # Configuración de PostCSS
├── package.json                      # Dependencias del proyecto
└── README.md                         # Este archivo
```

---

## 🚀 Primeros Pasos

### Requisitos Previos

- Node.js 18+ 
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/barrerasaezgonzalo/ai-code-review.git
cd ai-code-review

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.local.example .env.local
```

### Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# Ejecutar linter
npm run lint
```

Accede a `http://localhost:3000` en tu navegador.

### Build para Producción

```bash
npm run build
npm start
```

---

## 🔌 API

### POST `/api/analyze`

Endpoint principal para análisis de código.

**Request:**
```json
{
  "code": "// Tu código aquí",
  "mode": "explicacion"
}
```

**Response (éxito):**
```json
{
  "result": "Análisis detallado del código..."
}
```

**Errores Manejados:**
- `404 NOT_FOUND`: Endpoint no disponible
- `500 Server Error`: Error al procesar la solicitud
- Excepciones generales: Capturadas y devuelto mensaje de error

---

## 🎨 Modos de Análisis

AI Core Review soporta múltiples modos configurables:

- **Explicación**: Análisis detallado y legible del código
- **Optimización**: Recomendaciones de rendimiento
- **Seguridad**: Identificación de vulnerabilidades
- **Documentación**: Generación de documentación automática

---

## 📋 Convenciones de Código

- **Componentes**: PascalCase, un archivo por componente
- **Hooks**: camelCase con prefijo `use`
- **Tipos**: Definidos en `types.ts` con exportación nombrada
- **Constantes**: UPPER_CASE, centralizadas en `constants.ts`
- **Estilos**: Tailwind CSS con clases utilitarias

---

## 🔍 Debugging

### Logs en Consola

El store está configurado para logging detallado de errores:

```typescript
// En useStore.js
catch (error) {
  console.log(error); // Disponible en DevTools
  set({ result: "Error al analizar el código." });
}
```

### DevTools de Next.js

Utiliza las DevTools integradas:
- `npm run dev` activa el servidor con hot-reload
- Inspecciona componentes en React DevTools
- Valida tipos con TypeScript en tiempo real

---

## 📄 Licencia

Este proyecto está bajo licencia MIT.

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request para discutir cambios significativos.

---

## Captura

<img width="1284" height="872" alt="Captura de pantalla 2026-05-29 163457" src="https://github.com/user-attachments/assets/3504408e-30f0-48d6-8e31-7ba05f6ab964" />



