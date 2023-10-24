ROOT_DIR=$(pwd)

cd $ROOT_DIR/api && poetry install && poetry run task codegen

cd $ROOT_DIR/web && bun install