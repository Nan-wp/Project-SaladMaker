'use client';
import Sidebar from "../components/Sidebar";
import Ingredientspage from "../components/Ingredientspage";
import { useState } from "react";
import Modal from "../components/Modal";
import Recipe from "../components/Recipe";


export default function page() {

  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  
  const handleIngredientChange = (ingredients, calories) => {
    setSelectedIngredients(ingredients);
    setTotalCalories(calories);
  };
  const toggleModal = () => setModalOpen(!modalOpen);

  return (
    <>
    <div className="grid grid-cols-12">  
      <Sidebar />
      <Ingredientspage onIngredientChange={handleIngredientChange} />
    </div>
    {selectedIngredients.length > 0 && (
    <div className='cols-span-9 flex justify-end p-2 gap-2 bg-white'>
       <div className='bg-[#F8B602] p-2 rounded-xl flex justify-between '>
        <div className="flex items-center">
          <div className="bg-white text-[#F8B602] p-2 font-bold text-xl rounded-lg">{selectedIngredients.length}</div>
          <div className="text-white font-bold pl-2 text-lg">Your Ingredients</div>
        </div>
        <div className="flex items-center pl-96">
          <p className="text-white font-bold pl-2 text-lg">{totalCalories}</p>
          <p className="text-white font-bold pl-2 text-lg">Cal</p>
        </div>
       </div>
       <div className="bg-[#2FB62D] flex items-center p-2 rounded-lg">
        <button onClick={toggleModal}>
          <div className="text-white font-bold" >Create Recipe</div>
        </button>
       </div>
    </div>
     )}
      <Modal 
        isOpen={modalOpen} 
        toggle={toggleModal} 
        selectedIngredients={selectedIngredients}
        totalCalories={totalCalories}
      />
      <Recipe/>
   </>
  )
}
