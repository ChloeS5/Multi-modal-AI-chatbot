'use client'

import {use Chat} from 'ai/react';
import { useRef, useState } from 'react';


export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit} = useChat();

  const [files, setFiles] = useState<FileList | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);


  return (
    <div className='flex flex-col  w-full max-w-md py-24 mx-auto stretch' > 
    {messages.map(m => (
      <div key={m.id} className='whitespace-pre-wrap'>
        {m.role === 'user' ? 'User: ' : 'AI: '}
        {m.content}
        <div>
          {m?.experimental_attachments
          ?.filter(attachment => 
            attachment?.contentType?.startsWidth('image/'),
          )
          .map((attachment, index) => (
            <img
            key={`${m.id}-${index}`}
            src={attachment.url}
            width={500}
            alt={attachment.name}
            />
          ))}
          </div>
        </div>
    ))}

    < form
    onSubmit ={handleSubmit}
    className = 'fixed bottom-0 w-full max-w-md mb-8 border border-gray-300 rounded shadow-xl' 
      onSubmit={event => {
          handleSubmit(event, {
            experimental_attachments: files,
          });

          setFiles(undefined);

          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        }}
        >

<input
          type="file"
          className=""
          onChange={event => {
            if (event.target.files) {
              setFiles(event.target.files);
            }
          }}
          multiple
          ref={fileInputRef}
        />

      < input
      className='w-full p-2'
      value = {input}
      placeholder = 'Say something...'
      onChange={handleInputChange}
      />
    </form>
      </div>
  );
}
