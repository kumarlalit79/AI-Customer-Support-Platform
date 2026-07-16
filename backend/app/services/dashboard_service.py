from sqlalchemy.orm import Session

from app.models.conversation import Conversation
from app.models.document import Document
from app.models.message import Message


class DashboardService:

    @staticmethod
    def get_dashboard(
        db: Session,
        user_id: int,
    ):

        import os

        documents = (
            db.query(Document)
            .filter(
                Document.uploaded_by == user_id
            )
            .all()
        )

        conversations = (
            db.query(Conversation)
            .filter(
                Conversation.user_id == user_id
            )
            .order_by(
                Conversation.updated_at.desc()
            )
            .all()
        )

        conversation_ids = [
            conversation.id
            for conversation in conversations
        ]

        total_messages = (
            db.query(Message)
            .filter(
                Message.conversation_id.in_(conversation_ids)
            )
            .count()
            if conversation_ids
            else 0
        )

        pdf = 0
        txt = 0
        docx = 0
        markdown = 0
        faq = 0

        for document in documents:

            if document.storage_path == "FAQ":

                faq += 1

                continue

            extension = os.path.splitext(
                document.original_filename
            )[1].lower()

            if extension == ".pdf":

                pdf += 1

            elif extension == ".txt":

                txt += 1

            elif extension == ".docx":

                docx += 1

            elif extension in [
                ".md",
                ".markdown",
            ]:

                markdown += 1

        return {

            "total_documents": len(documents),

            "total_conversations": len(conversations),

            "total_messages": total_messages,

            "recent_uploads": [

                document.original_filename

                for document in sorted(
                    documents,
                    key=lambda x: x.created_at,
                    reverse=True,
                )[:5]

            ],

            "recent_conversations": [

                conversation.title

                for conversation in conversations[:5]

            ],

            "file_types": {

                "pdf": pdf,

                "txt": txt,

                "docx": docx,

                "markdown": markdown,

                "faq": faq,

            },

        }