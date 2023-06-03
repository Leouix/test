up:
	docker compose up -d

build-up:
	docker compose up --build -d

down:
	docker compose down

ps:
	docker compose ps

logs:
	docker compose logs

shell:
	docker compose exec backend sh