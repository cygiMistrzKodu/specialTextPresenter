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
      <div className='flex flex-wrap  justify-start  items-center  p-2 '>
        <TextPlace content="fog in the bay Golden Bough lala sddw wdwdwdwdwdwdwdwdwdwdwd" />
        <TextPlace content="drugi element wiekszy element lalala dwa ereere eefefeefefefefefefeffefefwef" />
        <TextPlace content="trzeci element" />
        <TextPlace content="trzeci element" />
        <TextPlace content="trzeci element" />
        <TextPlace content="trzeci element" />
        <TextPlace content="element" />
        <TextPlace content="trzt" />
        <TextPlace content="trzt" />
        <TextPlace content="trzt" />
        <TextPlace content="trzt" />
        <TextPlace content="trzt" />
        <TextPlace content="trzt" />
        <TextPlace content="trzt" />
        <TextPlace content="trzt" />
        <TextPlace content="trzt" />
        <TextPlace content="trzt" />
        <TextPlace content="trzt" />
      </div>
    </div>

  )
}

export default MainScrren;
