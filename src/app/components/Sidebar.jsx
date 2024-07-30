import Image from "next/image";

export default function Sidebar() {
    return (
      <div className="col-span-3  ">
         <div className="flex m-6">
               <p className="text-3xl font-bold">SALADMAKER</p><p className="text-yellow-400 text-3xl font-bold">.</p>
         </div>
         <div className="flex justify-center rounded-xl cursor-pointer bg-[#F8B602] w-[200px] m-6 p-2">
           <div className="flex justify-center"> 
             <Image width={30} height={30} src="./svg/saladlogo.svg"/>
           </div>
           <p className="p-2 text-white pl-6 font-medium">Salad maker</p>
         </div>
         <div className="flex justify-center rounded-xl w-[200px] m-6 p-2 cursor-pointer ">
          <div className="flex justify-center">
           <Image width={25} height={25} src="./svg/recipe.svg"/>
          </div>
          <p className="p-2 text-gray-400  pl-6 font-medium">Recipe</p>
         </div>
      </div>
    );
  }
  