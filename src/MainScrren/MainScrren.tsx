import { useEffect } from 'react';

interface IMainScrren {
  test: string
}

const MainScrren = ({ test }: IMainScrren) => {

  useEffect(() => {
    console.log(`MainScrren mounted`)
  }, [])

  return (
    <div className="MainScrren-component">
      <h1 className='text-3xl font-bold underline text-blue-600'>
        Test content lala
      </h1>
    </div>
  )
}

export default MainScrren;
