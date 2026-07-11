# Ssass — plantilla profesional para un SaaS escalable

Este repositorio define una estructura base para construir un SaaS moderno con:

- **Backend:** PHP 8.3 + Laravel 11 como API principal.
- **Frontend:** React con **Next.js** para SSR/SSG, rendimiento y buena experiencia SEO.
- **Escalabilidad:** PostgreSQL, Redis, colas, cache, jobs asíncronos, contenedores y separación por capas.
- **Operación:** Docker Compose para desarrollo, healthchecks, documentación técnica y convenciones de monorepo.

> Nota: este repo contiene la estructura profesional inicial. Los proyectos reales de Laravel y Next.js se deben generar dentro de `apps/api` y `apps/web` usando los comandos indicados abajo.

## Estructura principal

```text
.
├── apps/
│   ├── api/                 # Laravel API: dominio, módulos, colas, eventos, workers
│   └── web/                 # Next.js + React: app router, componentes, SDK cliente
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

### 2. Crear el frontend Next.js + React

```bash
npx create-next-app@latest apps/web --typescript --eslint --app --src-dir --tailwind
cd apps/web
npm install @tanstack/react-query zod axios zustand
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
- **Frontend desacoplado:** Next.js consume la API y mantiene validaciones compartidas con Zod/OpenAPI.

## Documentación

- [Arquitectura SaaS](docs/architecture.md)
- [Escalabilidad y rendimiento](docs/scaling.md)
- [Convenciones de desarrollo](docs/development.md)
