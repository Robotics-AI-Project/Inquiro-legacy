ROOT_DIR=$(pwd)

bunx openapi-typescript $ROOT_DIR/docs/openapi/schema.json -o $ROOT_DIR/web/types/openapi.ts

cd $ROOT_DIR/web && bun dev