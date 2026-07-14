from langchain_community.document_loaders import PyPDFLoader

class PDFLoader:
    @staticmethod
    def load(pdf_path: str):
        loader = PyPDFLoader(pdf_path)
        documents = loader.load()
        return documents