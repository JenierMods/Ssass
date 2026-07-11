# apps/web — Frontend funcional interactivo

Esta aplicación contiene una primera versión funcional e interactiva del SaaS. Está construida con HTML, CSS y JavaScript sin dependencias externas para que pueda ejecutarse sin instalar paquetes de npm. Esto permite probar flujos de producto y luego conectarla a la API Laravel.

## Funciones disponibles

- Inicio de sesión simulado con nombre y correo.
- Dashboard con métricas calculadas automáticamente.
- Gestión de clientes o tenants con creación y eliminación.
- Operaciones internas con tareas y cambio de estado.
- Vista de planes con cálculo mensual o anual.
- Persistencia local con `localStorage` para que los cambios no se pierdan al recargar.
- Diseño responsive para escritorio, tablet y móvil.

## Ejecutar localmente

```bash
cd apps/web
npm run dev
```

Luego abre `http://localhost:5173`.

## Próximo paso recomendado

Cuando el backend Laravel esté creado en `apps/api`, reemplaza los datos locales por llamadas reales a endpoints versionados de la API, por ejemplo `/api/v1/tenants`, `/api/v1/tasks` y `/api/v1/billing/plans`.
