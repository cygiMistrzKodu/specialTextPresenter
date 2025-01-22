import React from 'react';

interface TextContent {
  content: string;
}

const TextPlace: React.FC<TextContent> = (props) => {

  return (
    <div className="flex flex-wrap w-36 rounded  shadow-lg bg-green-700 p-2
     text-white text-base break-words border border-yellow-500
     hover:bg-green-950 hover:shadow-2xl min-w-[50px] min-h-[50px] m-1">
      {props.content}
    </div>
  )
}

export default TextPlace;
