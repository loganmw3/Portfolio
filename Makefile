.PHONY: push

push:
	@if [ -z "$(MSG)" ]; then \
		echo "❌ Error: commit message missing."; \
		echo "Usage: make push MSG=\"your commit message\""; \
		exit 1; \
	fi
	npm run build
	npm run deploy
	git add .
	git commit -m "$(MSG)"
	git push origin main
