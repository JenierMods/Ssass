# apps/web — Frontend React con Next.js

Directorio reservado para la aplicación web del SaaS.

## Por qué Next.js

Next.js usa React y permite SSR/SSG, rutas optimizadas, code splitting, streaming y buen rendimiento percibido. Es una opción sólida cuando el SaaS necesita paneles rápidos, páginas públicas con SEO y crecimiento de tráfico.

## Estructura recomendada

```text
src/
├── app/                 # App Router de Next.js
├── components/          # Componentes reutilizables
├── features/            # Funcionalidades por dominio
├── lib/                 # Clientes HTTP, auth, helpers
├── styles/              # Estilos globales
└── types/               # Tipos TypeScript
```

## Paquetes recomendados

- `@tanstack/react-query` para cache de datos del servidor.
- `zod` para validar respuestas y formularios.
- `axios` o `fetch` wrapper para consumir la API.
- `zustand` solo para estado cliente realmente global.
