import { useEffect } from 'react';
import TextPlace from '../TextPlace';

const MainScrren = () => {

  useEffect(() => {
    console.log(`MainScrren mounted`)
  }, [])

  return (
    <div className="h-screen w-screen bg-gray-700 overflow-auto">
      <h1 className='text-3xl font-bold underline text-yellow-500 text-center'>
        Wpisuj swój tekst
      </h1>
      <div className='flex flex-wrap justify-start items-start p-2'>
        <TextPlace  />
        <TextPlace  />
        <TextPlace  />
        <TextPlace  />
        <TextPlace  />
        <TextPlace  />
        <TextPlace  />
        <TextPlace  />
        <TextPlace  />
        <TextPlace  />
        <TextPlace  />
        <TextPlace  />
        <TextPlace  />
      </div>
    </div>

  )
}

export default MainScrren;
