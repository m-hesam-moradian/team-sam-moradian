# Build dev
docker compose -f compose.dev.yaml build

# Up dev
docker compose -f compose.dev.yaml up

# no-cache
docker compose -f compose.dev.yaml build --no-cache