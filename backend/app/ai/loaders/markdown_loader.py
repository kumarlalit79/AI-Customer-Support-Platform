from langchain_community.document_loaders import TextLoader

class MarkdownLoader:
    
    @staticmethod
    def load(file_path: str):
        loader = TextLoader(
            file_path=file_path,
            encoding="utf-8",
        )
        return loader.load()