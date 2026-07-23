import { ChatLayout } from '../../../components/chat/ChatLayout'

export default function ChatPage() {
  return (
    <div
      className="
        -mx-6 -my-6
        md:-mx-10 md:-my-10
        h-[calc(100vh-4rem)]
        lg:h-screen
        flex flex-col
      "
    >
      <ChatLayout />
    </div>
  )
}
