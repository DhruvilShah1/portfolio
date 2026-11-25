import pdfplumber

def extract_tables(pdf_path):

    extracted_tables = []

    # Open PDF file
    with pdfplumber.open(pdf_path) as pdf:

        for page_number, page in enumerate(pdf.pages, start=1):

            # Extract tables from current page
            tables = page.extract_tables()

            if tables:

                for table_number, table in enumerate(tables, start=1):

                    # Convert table rows into readable text
                    table_text = []

                    for row in table:

                        cleaned_row = [
                            str(cell).strip() if cell else ""
                            for cell in row
                        ]

                        table_text.append(" | ".join(cleaned_row))

                    # Store extracted table
                    extracted_tables.append({
                        "page": page_number,
                        "table_number": table_number,
                        "content": "\n".join(table_text)
                    })

    print("Total Tables Extracted:", len(extracted_tables))

    return extracted_tables