import React, { RefObject, useEffect, useRef, useState } from 'react';

const TextPlace = () => {

  const [inputText, setText] = useState('');
  const textareaRef: RefObject<HTMLTextAreaElement> = useRef(null);

  const handleTextChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setText(event.target.value);
  };

  const adjustContainerHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }

  useEffect(() => {
    adjustContainerHeight();
  }, [inputText]);

  return (
    <div className="w-36 rounded  shadow-lg bg-green-700
     text-white border border-yellow-500
     hover:bg-green-950 hover:shadow-2xl min-w-[200px] min-h-[50px] m-1 break-words p-2 ">
      <div className='flex justify-between items-start'>
        <textarea
          ref={textareaRef}
          value={inputText}
          onChange={handleTextChange}
          className='resize-none w-full bg-inherit overflow-hidden p-1 font-thin m-1'
          placeholder='Wpisz text'
        />
        <label className="swap swap-flip">
          <input type="checkbox" />
          <div className="swap-on">👍</div>
          <div className="swap-off">TO DO</div>
        </label>
      </div>
      <div className='flex justify-between'>
        <button className='btn btn-xs  btn-accent ' >Copy</button>
        <button className='btn btn-xs btn-error' >Clean</button>
      </div>
    </div>
  )
}

export default TextPlace;
