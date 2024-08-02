"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Card({
  ingredient,
  onQuantityChange,
  selectedIngredients,
}) {
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (selectedIngredients) {
      if (Array.isArray(selectedIngredients)) {
        const found = selectedIngredients.find(
          (item) => item.id === ingredient.id
        );
        setQuantity(found ? found.quantity : 0);
      } else if (typeof selectedIngredients === "object") {
        setQuantity(selectedIngredients[ingredient.id]?.quantity || 0);
      }
    }
  }, [selectedIngredients, ingredient.id]);

  const updateQuantity = (change) => {
    const newQuantity = Math.max(0, quantity + change);
    setQuantity(newQuantity);
    if (typeof onQuantityChange === "function") {
      onQuantityChange(ingredient, newQuantity);
    } else {
      console.error("onQuantityChange is not a function");
    }
  };

  return (
    <div>
      <div className="w-[300px] h-[300px] px-4 py-8 bg-white rounded-2xl shadow-md">
        <Image width={296} height={180} src={ingredient.image} />
        <div>
          <p className="font-medium pt-2 text-m">{ingredient.ingredient}</p>
          <p className="text-gray-600">{ingredient.description}</p>
          <div className="flex gap-2">
            <p className="font-bold text-xl">{ingredient.calories}</p>
            <p className="text-[#F8B602] font-bold text-xl">Cal</p>
          </div>
        </div>
        <div className="flex justify-end items-center gap-4">
          {quantity > 0 && (
            <button onClick={() => updateQuantity(-1)}>
              <Image
                width={30}
                height={30}
                src="./svg/buttonminus.svg"
                alt="Decrease"
              />
            </button>
          )}
          {quantity > 0 && <p className="font-bold text-2xl">{quantity}</p>}

          <button onClick={() => updateQuantity(1)}>
            <Image
              width={30}
              height={30}
              src="./svg/buttonplus.svg"
              alt="Increase"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
