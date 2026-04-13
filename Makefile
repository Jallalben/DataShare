up:
	docker compose up -d

down:
	docker compose down

e2e:
	docker compose -f docker-compose.yml -f docker-compose.e2e.yml --profile e2e up --abort-on-container-exit --exit-code-from cypress

logs:
	docker compose logs -f
