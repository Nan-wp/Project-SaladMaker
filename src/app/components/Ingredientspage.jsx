'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { ingredients, categories } from "../ingredients";
import Card from './Card';

export default function Ingredientspage({onIngredientChange}) {
  const [selectedCategories, setSelectedCategories] = useState(['all']);
  const [filteredIngredients, setFilteredIngredients] = useState(ingredients);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState({});

  const handleCategoryChange = (categoryId) => {
    let newCategories;
    if (categoryId === 'all') {
      newCategories = ['all'];
    } else {
      newCategories = selectedCategories.includes(categoryId)
        ? selectedCategories.filter(c => c !== categoryId)
        : [...selectedCategories.filter(c => c !== 'all'), categoryId];
      if (newCategories.length === 0) newCategories = ['all'];
    }

    setSelectedCategories(newCategories);

    const filtered = ingredients.filter(ingredient =>
      (newCategories.includes('all') || newCategories.includes(ingredient.category)) &&
      ingredient.ingredient.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredIngredients(filtered);
  };

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    const filtered = ingredients.filter(ingredient =>
      (selectedCategories.includes('all') || selectedCategories.includes(ingredient.category)) &&
      ingredient.ingredient.toLowerCase().includes(newSearchTerm.toLowerCase())
    );
    setFilteredIngredients(filtered);
  };
  const handleIngredientChange = (ingredient, quantity) => {
    const newSelectedIngredients = {
      ...selectedIngredients,
      [ingredient.id]: { ...ingredient, quantity }
    };
    setSelectedIngredients(newSelectedIngredients);

    const selectedIngredientsArray = Object.values(newSelectedIngredients).filter(ing => ing.quantity > 0);
    const totalCalories = selectedIngredientsArray.reduce((sum, ing) => sum + (ing.calories * ing.quantity), 0);
    
    // Make sure onIngredientChange is a function before calling it
    if (typeof onIngredientChange === 'function') {
      onIngredientChange(selectedIngredientsArray, totalCalories);
    } else {
      console.error('onIngredientChange is not a function');
    }
  };

  return (
    <>
    <div className="col-span-9  bg-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="font-bold text-3xl">Let's Create...your own salad!!!</div>
        <form className="w-[330px] flex items-center bg-gray-100 p-2 rounded-lg">
          <button
            type="submit"
            className="p-2 bg-gray-100 text-white rounded-l-md hover:bg-gray-300"
          >
            <Image width={20} height={20} src="/svg/search.svg" alt="Search" />
          </button>
          <input
            type="text"
            placeholder="Search ingredients to make a salad..."
            className="w-full text-sm bg-gray-100 pl-2"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </form>
      </div>

      <div className="mb-6">
        <Image width={1495} height={240} src="/image/textbar.png" alt="Text bar" />
      </div>

      <h2 className="font-bold text-xl mb-4">Select Category</h2>
      <div className="flex gap-6 mb-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`w-[130px] bg-white px-2 py-4 rounded-xl cursor-pointer ${selectedCategories.includes(category.id) ? 'shadow-xl' : ''}`}
            onClick={() => handleCategoryChange(category.id)}
          >
            <div className="flex flex-col items-center relative">
              <Image width={60} height={60} src={category.icon} alt={category.name} />
              <p className="text-sm pt-2 text-gray-500">{category.name}</p>
              {selectedCategories.includes(category.id) && (
                <Image width={15} height={21} src="/svg/Radio-Check.svg" alt="Selected" className='absolute -top-2 right-0' />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="font-bold text-xl mb-4">Choose your ingredients to make a salad</div>
      <div className="grid grid-cols-4 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
        {filteredIngredients.map((item,index)=>{ 
          return (<Card ingredient={item} 
                        key={index}
                        onQuantityChange={(quantity) => handleIngredientChange(item, quantity)}
                        initialQuantity={selectedIngredients[item.id]?.quantity || 0}/>)
        })}
      </div>
      
    </div>
   
  </>
  );
}