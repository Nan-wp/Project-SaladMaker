import React from "react";
import EditRecipe from "../component/EditRecipe";
import Sidebar from "@/app/components/Sidebar";

async function getRecipeById(id) {
  const res = await fetch(`http://localhost:3000/api/recipe/${id}`, {
    method: "GET",
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to get recipe");
  }
  return res.json();
}

export default async function ({ params }) {
  const id = params.id;
  const recipeData = await getRecipeById(id);

  return (
    <div className="grid grid-cols-12">
      <Sidebar />
      <EditRecipe recipeData={recipeData.results} />
    </div>
  );
}
