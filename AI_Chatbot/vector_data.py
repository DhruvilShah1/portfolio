from langchain_core.documents import Document


def create_vector_data(documents, tables):

    vector_data = []

    # STEP 1: Add normal PDF text
    for document in documents:

        vector_data.append(
            Document(
                page_content=document.page_content,
                metadata={
                    "source": document.metadata.get("source"),
                    "page": document.metadata.get("page"),
                    "type": "text"
                }
            )
        )

    # STEP 2: Add extracted table data
    for table in tables:

        vector_data.append(
            Document(
                page_content=table["content"],
                metadata={
                    "page": table["page"],
                    "table_number": table["table_number"],
                    "type": "table"
                }
            )
        )

    print("Total Vector Documents:", len(vector_data))

    return vector_data