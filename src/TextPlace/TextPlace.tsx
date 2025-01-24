import { event } from '@tauri-apps/api';
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

  const clearContent = () => {
    setText('');
  }

  const copyContent = () => {
    navigator.clipboard.writeText(inputText);
  }

  const [isDone, setIsDone] = useState(false);
  const [textPlaceBgColor, setTextPlaceBgColor] = useState('bg-green-700')
  
  const isTaskDone = (event: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
    setIsDone(event.target.checked);
    
  
    if (event.target.checked) {

      console.log("task zrobiony");
      // backGround = 'bg-green-700'
      setTextPlaceBgColor('bg-black');

    } else {
      console.log("Do zrobienia");
      // backGround = 'bg-black'
      setTextPlaceBgColor('bg-green-700');
    }

    
  }

  return (
    <div className={`w-36 rounded  shadow-lg  ${textPlaceBgColor}
     text-white border border-yellow-500
     hover:bg-green-950 hover:shadow-2xl min-w-[200px] min-h-[50px] m-1 break-words p-2`}>
      <div className='flex justify-between items-start'>
        <textarea
          ref={textareaRef}
          value={inputText}
          onChange={handleTextChange}
          className='resize-none w-full bg-inherit overflow-hidden p-1 font-thin m-1'
          placeholder='Wpisz text'
        />
        <label className="swap swap-flip">
          <input type="checkbox" checked={isDone} onChange={isTaskDone} />
          <div className="swap-on">👍</div>
          <div className="swap-off">TO DO</div>
        </label>
      </div>
      <div className='flex justify-between'>
        <button className='btn btn-xs  btn-accent' onClick={copyContent} >Copy</button>
        <button className='btn btn-xs btn-error' onClick={clearContent} >Clean</button>
      </div>
    </div>
  )
}

export default TextPlace;
