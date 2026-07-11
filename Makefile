.PHONY: up down ps logs format test

up:
	docker compose up -d postgres redis mailpit

down:
	docker compose down

ps:
	docker compose ps

logs:
	docker compose logs -f --tail=100

format:
	@echo "Run Laravel Pint in apps/api and frontend formatter in apps/web after scaffolding projects."

test:
	@echo "Run backend and frontend tests after scaffolding apps/api and apps/web."
