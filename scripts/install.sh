ROOT_DIR=$(pwd)

cd $ROOT_DIR/api && poetry install && poetry run prisma generate

cd $ROOT_DIR/web && bun install