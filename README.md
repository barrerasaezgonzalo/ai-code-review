# AI Core Review

Una plataforma profesional de auditoría de código impulsada por inteligencia artificial. **AI Core Review** analiza, documenta y mejora la calidad del código mediante IA, proporcionando retroalimentación detallada y recomendaciones de optimización.

---

## 🎯 Características Principales

- **Análisis Inteligente**: Evaluación profunda de código con múltiples modos de análisis
- **Interfaz Responsiva**: Experiencia de usuario moderna y accesible
- **Estado Centralizado**: Gestión eficiente del estado con Zustand
- **Tipado Fuerte**: Implementación completa de TypeScript

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

El store centralizado `useStore` mantiene toda la lógica de estado

**Ventajas del enfoque:**

- ✅ Acciones asincrónicas manejadas de forma elegante
- ✅ Gestión de errores tipada (404 y excepciones)
- ✅ Estados de carga explícitos para feedback al usuario
- ✅ Cero re-renders innecesarios gracias a Zustand

---

## 🔧 Configuración Técnica

### ESLint

La configuración de ESLint está optimizada para proyectos Next.js con reglas específicas para evitar falsos positivos en patrones comunes:

**Patrones clave:**

- ✅ `clearInterval` en cleanup para evitar fugas de memoria
- ✅ Uso de `useRef` para referencias persistentes
- ✅ Callbacks funcionales para evitar closures anticuadas

---

## 📦 Stack Tecnológico

| Tecnología           | Versión | Propósito                              |
| -------------------- | ------- | -------------------------------------- |
| **Next.js**          | 16.2.6  | Framework React con App Router y SSR   |
| **React**            | 19.2.4  | Librería de componentes UI             |
| **TypeScript**       | ^5      | Tipado estático y seguridad de tipos   |
| **Zustand**          | ^5.0.14 | Gestión de estado ligera y performante |
| **Tailwind CSS**     | ^4      | Framework de estilos utilitarios       |
| **ESLint**           | ^9      | Linting y calidad de código            |
| **React Markdown**   | ^10.1.0 | Renderizado de Markdown en resultados  |
| **Rehype Highlight** | ^7.0.2  | Highlighting de código                 |
| **Lucide React**     | ^1.3.0  | Iconos modernos                        |

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
  "code": "// Tu código aquí"
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
- **Complejidad**: Identificación de Complejidad
- **Roasted**: Análisis entretenido del código

---

## Captura
