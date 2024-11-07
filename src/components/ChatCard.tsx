import { memo } from 'react';
import Markdown from 'react-markdown';

interface ChatCardProps {
  chatItem: ChatItem;
}

const ChatCard = ({ chatItem }: ChatCardProps) => {
  return (
    <div
      className="justify-between flex-row flex-wrap items-end gap-1 rounded-3xl my-1 px-5 py-3"
      style={{
        backgroundColor: chatItem.ai ? '#507680' : '#EBD9CD',
        marginRight: chatItem.ai ? 40 : 0,
        marginLeft: chatItem.ai ? 0 : 40,
        alignSelf: chatItem.ai ? 'flex-start' : 'flex-end',
      }}
    >
      <Markdown
        components={{
          p: ({ node, ...props }) => (
            <p
              {...props}
              style={{
                color: chatItem.ai ? 'white' : 'black',
                fontWeight: '600',
              }}
            />
          ),
        }}
      >
        {chatItem.message}
      </Markdown>
      <p
        className="text-xs"
        style={{
          color: chatItem.ai ? 'white' : 'black',
        }}
      >
        {chatItem.time}
      </p>
    </div>
  );
};

export default memo(ChatCard);
