"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ingredients, categories } from "../../ingredients";
import Card from "./Card";
import Modal from "@/app/components/Modal";
import Swal from "sweetalert2";

export default function Ingredientspage() {
  const [selectedCategories, setSelectedCategories] = useState(["all"]);
  const [filteredIngredients, setFilteredIngredients] = useState(ingredients);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [totalCalories, setTotalCalories] = useState(0);
  const [modalMode, setModalMode] = useState("create");

  const handleCategoryChange = (categoryId) => {
    let newCategories;
    if (categoryId === "all") {
      newCategories = ["all"];
    } else {
      newCategories = selectedCategories.includes(categoryId)
        ? selectedCategories.filter((c) => c !== categoryId)
        : [...selectedCategories.filter((c) => c !== "all"), categoryId];
      if (newCategories.length === 0) newCategories = ["all"];
    }

    setSelectedCategories(newCategories);

    const filtered = ingredients.filter(
      (ingredient) =>
        (newCategories.includes("all") ||
          newCategories.includes(ingredient.category)) &&
        ingredient.ingredient.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredIngredients(filtered);
  };

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    const filtered = ingredients.filter(
      (ingredient) =>
        (selectedCategories.includes("all") ||
          selectedCategories.includes(ingredient.category)) &&
        ingredient.ingredient
          .toLowerCase()
          .includes(newSearchTerm.toLowerCase())
    );
    setFilteredIngredients(filtered);
  };
  const handleIngredientChange = (ingredient, quantity) => {
    let newSelectedIngredients;

    if (Array.isArray(selectedIngredients)) {
      // If selectedIngredients is already an array
      const index = selectedIngredients.findIndex(
        (item) => item.id === ingredient.id
      );
      if (index !== -1) {
        newSelectedIngredients = selectedIngredients.map((item) =>
          item.id === ingredient.id ? { ...item, quantity } : item
        );
      } else {
        newSelectedIngredients = [
          ...selectedIngredients,
          { ...ingredient, quantity },
        ];
      }
    } else {
      // If selectedIngredients is still an object
      newSelectedIngredients = {
        ...selectedIngredients,
        [ingredient.id]: { ...ingredient, quantity },
      };
    }

    // Convert to array if it's still an object
    const selectedIngredientsArray = Array.isArray(newSelectedIngredients)
      ? newSelectedIngredients
      : Object.values(newSelectedIngredients);

    // Filter out ingredients with quantity 0 or less
    const filteredIngredients = selectedIngredientsArray.filter(
      (ing) => ing.quantity > 0
    );

    setSelectedIngredients(filteredIngredients);

    const totalCalories = filteredIngredients.reduce(
      (sum, ing) => sum + ing.calories * ing.quantity,
      0
    );
    setTotalCalories(totalCalories);
  };
  const handleCreateRecipe = async (name, ingredients) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("ingredient", JSON.stringify(ingredients));
      formData.append("calorie", totalCalories);

      const res = await fetch(`http://localhost:3000/api/recipe/`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      // Show success popup
      Swal.fire({
        title: "Success!",
        text: "Recipe created successfully",
        icon: "success",
        confirmButtonText: "OK",
      });
      setSelectedIngredients({});
    } catch (error) {
      console.error("Error in handleCreateRecipe:", error);

      // Show error popup
      Swal.fire({
        title: "Error!",
        text: "Failed to create recipe",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <>
      <div className="col-span-9  bg-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="font-bold text-3xl">
            Let's Create...your own salad!!!
          </div>
          <form className="w-[330px] flex items-center bg-gray-100 p-2 rounded-lg">
            <button
              type="submit"
              className="p-2 bg-gray-100 text-white rounded-l-md hover:bg-gray-300"
            >
              <Image
                width={20}
                height={20}
                src="/svg/search.svg"
                alt="Search"
              />
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
          <Image
            width={1495}
            height={240}
            src="/image/textbar.png"
            alt="Text bar"
          />
        </div>

        <h2 className="font-bold text-xl mb-4">Select Category</h2>
        <div className="flex gap-6 mb-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`w-[130px] bg-white px-2 py-4 rounded-xl cursor-pointer ${
                selectedCategories.includes(category.id) ? "shadow-xl" : ""
              }`}
              onClick={() => handleCategoryChange(category.id)}
            >
              <div className="flex flex-col items-center relative">
                <Image
                  width={60}
                  height={60}
                  src={category.icon}
                  alt={category.name}
                />
                <p className="text-sm pt-2 text-gray-500">{category.name}</p>
                {selectedCategories.includes(category.id) && (
                  <Image
                    width={15}
                    height={21}
                    src="/svg/Radio-Check.svg"
                    alt="Selected"
                    className="absolute -top-2 right-0"
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="font-bold text-xl mb-4">
          Choose your ingredients to make a salad
        </div>
        <div className="grid grid-cols-4 gap-4 max-sm:grid-cols-1 max-md:grid-cols-1 max-2xl:grid-cols-3 max-xl:grid-cols-2">
          {filteredIngredients.map((item, index) => {
            return (
              <Card
                ingredient={item}
                key={index}
                onQuantityChange={handleIngredientChange}
                selectedIngredients={selectedIngredients}
              />
            );
          })}
        </div>
      </div>
      {selectedIngredients.length > 0 && (
        <>
          <div className="col-span-3"></div>
          <div className="col-span-9">
            <div className="grid grid-cols-12">
              <div className="bg-[#F8B602] p-2 rounded-xl flex justify-between col-span-9 m-2">
                <div className="flex items-center">
                  <div className="bg-white text-[#F8B602] p-2  font-bold text-xl rounded-lg">
                    {selectedIngredients.length}
                  </div>
                  <div className="text-white font-bold pl-2 text-lg">
                    Your Ingredients
                  </div>
                </div>
                <div className="flex items-center pl-96">
                  <p className="text-white font-bold pl-2 text-lg">
                    {totalCalories}
                  </p>
                  <p className="text-white font-bold pl-2 pr-2 text-lg">Cal</p>
                </div>
              </div>
              <div className="bg-[#2FB62D] flex items-center justify-center p-2 mx-10 sm:mx-2 rounded-lg col-span-3 m-2">
                <button onClick={toggleModal}>
                  <p className="text-white font-bold">Create Recipe</p>
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        selectedIngredients={selectedIngredients}
        totalCalories={totalCalories}
        mode={modalMode}
        onConfirm={handleCreateRecipe}
      />
    </>
  );
}
