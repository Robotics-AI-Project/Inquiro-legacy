ROOT_DIR=$(pwd)

echo "========================================"
echo "🚌 Installing Poetry dependencies"

cd $ROOT_DIR/api && poetry install && poetry run task codegen

echo "========================================"
echo "🚌 Installing Next.js dependencies"

cd $ROOT_DIR/web && bun install