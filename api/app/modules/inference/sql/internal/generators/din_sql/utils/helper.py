from typing import List


def extract_tables_from_schema_links(schema_links: str) -> List[str]:
    schema_links_list = schema_links.split(",")
    tables = set()
    for schema_link in schema_links_list:
        if "." in schema_link:
            tables.add(schema_link.split(".")[0].strip())
    return list(tables)
