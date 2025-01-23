import React, { RefObject, useEffect, useRef, useState } from 'react';

const TextPlace = () => {

  const [inputText, setText] = useState('');
  const textareaRef: RefObject<HTMLTextAreaElement> = useRef(null);

  const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setText(event.target.value);
  };

  useEffect( () => {
    if(textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  });

  return (
    <div className="w-36 rounded  shadow-lg bg-green-700
     text-white border border-yellow-500
     hover:bg-green-950 hover:shadow-2xl min-w-[100px] min-h-[50px] m-0 break-words">
      <textarea
        ref={textareaRef}
        value={inputText}
        onChange={handleChange}
        className='resize-none w-full bg-inherit overflow-hidden'
      />
    </div>
  )
}

export default TextPlace;
