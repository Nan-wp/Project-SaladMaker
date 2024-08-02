"use client";
import Modal from "@/app/components/Modal";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import Swal from "sweetalert2";

export default function EditRecipe({ recipeData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [ingredientToDelete, setIngredientToDelete] = useState(null);
  const [editedRecipeData, setEditedRecipeData] = useState(
    recipeData || { ingredient: [] }
  );
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const calculateTotalCalories = useCallback(() => {
    return editedRecipeData.ingredient.reduce((sum, item) => {
      return sum + item.calories * item.quantity;
    }, 0);
  }, [editedRecipeData.ingredient]);

  const [totalCalories, setTotalCalories] = useState(calculateTotalCalories());

  const handleDelete = useCallback((indexToDelete) => {
    setIngredientToDelete(indexToDelete);
    setModalMode("delete");
    setIsModalOpen(true);
  }, []);

  const confirmDelete = useCallback(() => {
    if (ingredientToDelete !== null) {
      setEditedRecipeData((prevData) => {
        const updatedIngredients = prevData.ingredient.filter(
          (_, index) => index !== ingredientToDelete
        );
        return { ...prevData, ingredient: updatedIngredients };
      });
      setIngredientToDelete(null);
      setIsModalOpen(false);
    }
  }, [ingredientToDelete]);
  // Update total calories when editedRecipeData changes
  React.useEffect(() => {
    setTotalCalories(calculateTotalCalories());
  }, [editedRecipeData, calculateTotalCalories]);

  const handleEditRecipe = async () => {
    console.log(editedRecipeData);

    try {
      const formData = new FormData();
      formData.append("name", editedRecipeData.name);
      formData.append(
        "ingredient",
        JSON.stringify(editedRecipeData.ingredient)
      );
      formData.append("calorie", totalCalories);

      const res = await fetch(
        `http://localhost:3000/api/recipe/${editedRecipeData.id}`,
        {
          method: "PATCH",
          body: formData,
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      Swal.fire({
        title: "Success!",
        text: "Recipe updated successfully",
        icon: "success",
        confirmButtonText: "OK",
      });

      const data = await res.json();
    } catch (error) {
      console.error("Error in handleCreateRecipe:", error);
    }
  };

  return (
    <div className="grid grid-cols-12 col-span-9 h-screen">
      <div className="bg-gray-200 p-6 col-span-12 ">
        <div className="font-extrabold text-3xl">Edit Recipe</div>
        <div className="bg-white m-8 p-2 rounded-lg">
          <p className="font-extrabold text-xl p-4">
            Your ingredients to make a salad Recipe
          </p>
          {editedRecipeData.ingredient.map((item, index) => {
            return (
              <div className="flex justify-between h-[100px] gap-4 p-2">
                <div className="flex gap-4">
                  <Image width={120} height={100} src={item.image} />
                  <div className="flex flex-col pt-4  items-start">
                    <div className="flex flex-col">
                      <p className="font-semibold text-m">{item.ingredient}</p>
                      <p>{item.id}</p>
                    </div>
                    <div className="flex gap-4 ">
                      <p className="text-sm text-gray-400">x{item.quantity}</p>

                      <p
                        className="text-red-500 font-medium underline text-sm cursor-pointer"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <p className="font-medium text-m p-2">+{item.calories}</p>
                  <p className="text-[#F8B602] p-2 font-bold text-m ">Cal</p>
                </div>
              </div>
            );
          })}

          <div className="pt-4 w-auto">
            <Image
              width={1447}
              height={1}
              src="/svg/line.svg"
              className="text-gray-500"
            />
          </div>
          <div className="flex justify-between p-4">
            <p className="p-2 text-m pt-4">Total Calorie</p>

            <div className="flex items-center">
              <p className="font-medium text-xl p-2">{totalCalories}</p>
              <p className="text-[#F8B602] p-2 font-bold text-xl ">Cal</p>
            </div>
          </div>

          <div className="bg-[#F8B602] flex items-center justify-center p-2 rounded-lg col-span-3 m-2">
            <button className="" onClick={handleEditRecipe}>
              <p className="text-white font-bold text-sm">Update Recipe</p>
            </button>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        toggle={() => setIsModalOpen(false)}
        mode={modalMode}
        onConfirm={modalMode === "delete" ? confirmDelete : undefined}
      />
    </div>
  );
}
