import Image from "next/image";
import React, { useState } from "react";

export default function Modal({
  isOpen,
  toggle,
  selectedIngredients,
  totalCalories,
  mode,
  onConfirm,
  handleCreateRecipe,
}) {
  const [recipeName, setRecipeName] = useState("");
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      {mode === "create" ? (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <div className="flex justify-end">
            <Image
              width={11}
              height={11}
              src="/svg/close.svg"
              onClick={toggle}
            />
          </div>
          <div className="mb-4 flex flex-col items-center gap-2">
            <Image width={72} height={72} src="/svg/restaurantlogo.svg" />
            <p className="text-lg font-medium pt-4">Recipe Name</p>
            <form className="w-[330px] flex items-center border-2  p-2 rounded-lg">
              <input
                type="text"
                placeholder="Input Your Recipe Name....."
                className="w-full text-sm pl-2 "
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
              />
            </form>
          </div>
          <div className="flex justify-center gap-4 p-2">
            <button
              onClick={toggle}
              className=" bg-white text-m px-14 py-2 rounded"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm(
                  recipeName,
                  selectedIngredients,
                  totalCalories,
                  handleCreateRecipe
                );
                toggle();
              }}
              className=" bg-[#2FB62D] text-white text-m px-4 py-2 rounded"
            >
              Create New Recipe
            </button>
          </div>
        </div>
      ) : mode === "delete" ? (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <div className="flex justify-end">
            <Image
              width={11}
              height={11}
              src="/svg/close.svg"
              onClick={toggle}
            />
          </div>
          <div className="mb-4 flex flex-col items-center gap-2">
            <Image width={72} height={72} src="/svg/Icondelete.svg" />
            <p className="text-lg font-medium pt-4">Delete Recipe</p>
          </div>

          <div className="flex justify-center gap-4 p-2">
            <button
              onClick={toggle}
              className=" bg-white text-m px-14 py-2 rounded"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className=" bg-[#FF3F56] text-white text-m px-14 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
