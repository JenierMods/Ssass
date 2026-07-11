# Escalabilidad y rendimiento

## Reglas clave

- No hacer tareas lentas durante requests HTTP: mover emails, reportes, imports y llamadas externas a jobs.
- Usar Redis para cache, colas, rate limiting y sesiones.
- Indexar toda columna usada para filtros frecuentes: `tenant_id`, `user_id`, `created_at`, estados y slugs.
- Versionar la API desde el inicio: `/api/v1`.
- Separar procesos: web/API, workers, scheduler y frontend.

## Preparación para muchos usuarios

1. **Horizontal scaling:** múltiples contenedores API detrás de un load balancer.
2. **Workers independientes:** escalar colas según carga real.
3. **Cache estratégica:** cachear dashboards, catálogos, permisos y configuración de tenant.
4. **Read replicas:** usar réplicas de PostgreSQL para reportes o lecturas intensivas cuando sea necesario.
5. **CDN:** servir assets del frontend y archivos públicos desde CDN.
6. **Observabilidad:** métricas, logs estructurados, tracing y alertas.

## Decisiones recomendadas para producción

- Ejecutar Laravel con Octane cuando el tráfico lo justifique.
- Mantener workers separados del proceso HTTP.
- Usar migraciones seguras sin locks prolongados.
- Implementar rate limits por usuario, tenant e IP.
- Aplicar backoff y retries controlados en integraciones externas.
