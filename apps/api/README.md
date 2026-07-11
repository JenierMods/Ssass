# apps/api — Backend Laravel

Directorio reservado para la API principal en Laravel.

## Responsabilidades

- Autenticación y autorización.
- Gestión de tenants, usuarios, roles y permisos.
- Lógica de negocio organizada por módulos de dominio.
- Jobs, eventos, listeners y notificaciones.
- API REST/JSON versionada.
- Integración con pagos, emails y servicios externos.

## Estructura recomendada dentro de Laravel

```text
app/
├── Domain/
│   ├── Tenant/
│   ├── Billing/
│   ├── User/
│   └── Subscription/
├── Http/
│   ├── Controllers/Api/V1/
│   ├── Middleware/
│   └── Requests/
├── Jobs/
├── Events/
├── Listeners/
└── Policies/
```

## Paquetes recomendados

- `laravel/sanctum` para SPA/API authentication.
- `laravel/horizon` para administrar colas Redis.
- `laravel/octane` con Swoole o RoadRunner para alto rendimiento.
- `spatie/laravel-permission` para roles y permisos.
