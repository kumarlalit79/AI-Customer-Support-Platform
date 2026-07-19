import { ChatLayout } from '../../../components/chat/ChatLayout'

/**
 * ChatPage breaks out of DashboardLayout's padded <main> using a
 * negative margin wrapper, so the chat interface can fill the full
 * available height and width of the content area.
 */
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
