from pydantic import BaseModel, Field


class GenerateSQLDTO(BaseModel):
    prompt: str
    db_url: str = Field(alias="dbUrl")
    generator: str = Field(default="DIN-SQL")
    model: str = Field(default="GPT-4")
