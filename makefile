docker-up:
	@cd ops && docker compose up -d

docker-down:
	@cd ops && docker compose down

docker-logs:
	@cd ops && docker compose logs -f


