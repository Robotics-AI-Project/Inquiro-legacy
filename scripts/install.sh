ROOT_DIR=$(pwd)

cd $ROOT_DIR/api && poetry install

cd $ROOT_DIR/web && bun install