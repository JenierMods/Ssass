# Ssass — plantilla profesional para un SaaS escalable

Este repositorio define una estructura base para construir un SaaS moderno con:

- **Backend:** PHP 8.3 + Laravel 11 como API principal.
- **Frontend:** página funcional servida como app estática; preparada para migrar a React o integrarse con Next.js si necesitas SSR/SEO avanzado.
- **Escalabilidad:** PostgreSQL, Redis, colas, cache, jobs asíncronos, contenedores y separación por capas.
- **Operación:** Docker Compose para desarrollo, healthchecks, documentación técnica y convenciones de monorepo.

> Nota: este repo contiene una estructura profesional inicial y una primera página funcional en `apps/web`. El backend Laravel real se debe generar dentro de `apps/api` usando los comandos indicados abajo.

## Estructura principal

```text
.
├── apps/
│   ├── api/                 # Laravel API: dominio, módulos, colas, eventos, workers
│   └── web/                 # Panel funcional interactivo del SaaS
├── packages/
│   ├── contracts/           # OpenAPI, JSON Schemas y contratos compartidos
│   └── ui/                  # Librería UI compartida para React
├── infra/
│   ├── docker/              # Dockerfiles y configuración de servicios
│   └── nginx/               # Reverse proxy / configuración HTTP
├── docs/                    # Arquitectura, escalabilidad y decisiones técnicas
├── docker-compose.yml       # Stack local: api, web, postgres, redis, mailpit
├── Makefile                 # Comandos comunes del proyecto
└── .env.example             # Variables base para desarrollo
```

## Cómo iniciar el proyecto real

### 1. Crear el backend Laravel

```bash
composer create-project laravel/laravel apps/api
cd apps/api
composer require laravel/sanctum laravel/horizon laravel/octane spatie/laravel-permission
php artisan install:api
php artisan vendor:publish --provider="Laravel\\Sanctum\\SanctumServiceProvider"
```

### 2. Ejecutar la página funcional

```bash
cd apps/web
npm run dev
```

### 3. Levantar servicios locales

```bash
cp .env.example .env
make up
```

## Principios de arquitectura

- **API-first:** el backend expone contratos versionados en `packages/contracts`.
- **Multi-tenant preparado:** separar datos por `tenant_id` desde el inicio o usar base de datos por tenant si el producto lo requiere.
- **Trabajo asíncrono:** emails, facturación, reportes e integraciones externas van por colas.
- **Cache controlada:** Redis para sesiones, cache, rate limiting y colas.
- **Observabilidad:** logs estructurados, métricas, healthchecks y trazabilidad desde la primera versión.
- **Frontend desacoplado:** la página consume la API y puede mantener validaciones compartidas con Zod/OpenAPI cuando se conecte al backend.

## Documentación

- [Arquitectura SaaS](docs/architecture.md)
- [Escalabilidad y rendimiento](docs/scaling.md)
- [Convenciones de desarrollo](docs/development.md)
