from app.modules.inference.sql.dto import GenerateSQLDTO
from app.modules.inference.sql.internal.generators import SQLGenerator
from fastapi import APIRouter, HTTPException

router = APIRouter(prefix="/sql", tags=["sql"])


@router.post("/", description="Generate SQL")
async def generate_sql(body: GenerateSQLDTO):
    model = SQLGenerator(body.model, body.generator, "POSTGRES", body.db_url)
    result = model.generate(body.prompt)
    return result
