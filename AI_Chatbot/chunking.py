
from langchain_text_splitters import RecursiveCharacterTextSplitter


def create_chunks(documents):

    text_splitter = RecursiveCharacterTextSplitter(

        chunk_size=1000,

        chunk_overlap=100,

        length_function=len,

        separators=["\n\n", "\n", " ", ""]

    )

    chunks = text_splitter.split_documents(documents)

    print(f"Total Chunks Created: {len(chunks)}")

    return chunks
