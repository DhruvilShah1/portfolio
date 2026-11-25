
from langchain_community.document_loaders import PyPDFLoader


def load_pdf(pdf_path):

    # Create PDF Loader
    loader = PyPDFLoader(pdf_path)

    # Load PDF documents
    documents = loader.load()

    print("Total Pages:", len(documents))

    return documents


