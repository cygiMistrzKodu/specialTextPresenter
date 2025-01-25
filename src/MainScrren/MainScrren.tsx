import { useEffect } from "react";
import Task from "../Task";

const MainScrren = () => {
  useEffect(() => {
    console.log(`MainScrren mounted`);
  }, []);

  return (
    <div className="h-screen w-screen bg-gray-700 overflow-auto">
      <h1 className="text-3xl font-bold underline text-yellow-500 text-center">
        Wpisuj swój tekst
      </h1>
      <div className="flex flex-wrap justify-start items-start p-2 m-1">
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
      </div>
    </div>
  );
};

export default MainScrren;
