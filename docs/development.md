# Convenciones de desarrollo

## Branching

- `main`: rama estable.
- `develop`: integración previa a release si el equipo lo necesita.
- `feature/*`: nuevas funcionalidades.
- `fix/*`: correcciones.

## Calidad

Backend Laravel:

```bash
cd apps/api
composer test
./vendor/bin/pint
php artisan test
```

Frontend Next.js:

```bash
cd apps/web
npm run lint
npm run test
npm run build
```

## Commits

Usar mensajes claros, preferiblemente estilo Conventional Commits:

- `feat: add tenant invitations`
- `fix: handle expired subscription webhook`
- `docs: describe scaling strategy`
