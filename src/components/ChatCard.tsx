import Markdown from 'react-markdown'

interface ChatItem {
  ai: boolean
  message: string
  time: string
}

interface ChatCardProps {
  chatItem: ChatItem
}

function ChatCard({ chatItem }: ChatCardProps) {
  const { ai, message, time } = chatItem

  return (
    <div className={`flex ${ai ? 'justify-start' : 'justify-end'} mb-4`} >
  <div
    className={`max-w-[80%] sm:max-w-[70%] md:max-w-[60%] rounded-3xl px-4 py-3 ${ai ? 'bg-[#507680] text-white' : 'bg-[#EBD9CD] text-black'
      }`}
  >
    <Markdown
      components={{
        p: ({ node, ...props }) => <p className="mb-2" {...props} />,
        h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mb-2" {...props} />,
        h2: ({ node, ...props }) => <h2 className="text-xl font-bold mb-2" {...props} />,
        h3: ({ node, ...props }) => <h3 className="text-lg font-bold mb-2" {...props} />,
        h4: ({ node, ...props }) => <h4 className="text-base font-bold mb-2" {...props} />,
        li: ({ node, ...props }) => <li className="ml-4" {...props} />,
      }}
    >
      {message}
    </Markdown>
    <div className="text-xs mt-2 text-right">
      {time}
    </div>
  </div>
    </div >
  )
}

export default ChatCard