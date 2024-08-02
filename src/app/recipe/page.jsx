import React from "react";
import Recipe from "./components/Recipe";
import Sidebar from "../components/Sidebar";

async function getRecipe() {
  const res = await fetch(`http://localhost:3000/api/recipe/`, {
    method: "GET",
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to get recipe");
  }
  return res.json();
}
export default async function page() {
  const newRecipe = await getRecipe();
  return (
    <div className="grid grid-cols-12">
      <Sidebar />
      <Recipe recipeData={newRecipe.results} />
    </div>
  );
}
