# Arquitectura SaaS propuesta

## Stack recomendado

- **Laravel** como API backend por su productividad, ecosistema, colas, jobs, policies y soporte empresarial.
- **Next.js + React** para el frontend por rendimiento, SSR/SSG, buena DX y despliegue flexible.
- **PostgreSQL** como base de datos relacional principal.
- **Redis** para cache, sesiones, rate limiting y colas.
- **Laravel Horizon** para observar y administrar workers.
- **Laravel Octane** para mejorar throughput cuando la API tenga más tráfico.

## Capas del backend

1. **HTTP/API:** controllers finos, requests validados y resources consistentes.
2. **Application:** casos de uso, servicios transaccionales y orquestación.
3. **Domain:** reglas de negocio independientes de la capa HTTP.
4. **Infrastructure:** integraciones externas, mail, pagos, storage y proveedores.

## Multi-tenancy

Para un SaaS profesional, define la estrategia desde el inicio:

- **Tenant por columna (`tenant_id`):** más simple, económico y suficiente para muchos SaaS B2B.
- **Base de datos por tenant:** más aislamiento, más costo operativo y más complejidad.

La opción inicial recomendada es `tenant_id` con índices compuestos y policies estrictas, salvo que existan requisitos fuertes de aislamiento.

## Módulos iniciales

- Identity: usuarios, sesiones, roles y permisos.
- Tenant: organizaciones, miembros e invitaciones.
- Billing: planes, suscripciones, facturas y webhooks.
- Notifications: emails, eventos y preferencias.
- Audit: trazabilidad de acciones importantes.
