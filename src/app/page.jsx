"use client";
import React, { useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Ingredientspage from "./Ingredients/components/Ingredientspage";
import { redirect } from "next/navigation";

export default function page() {
  useEffect(() => {
    redirect("/Ingredients");
  });
  return (
    <div className="grid grid-cols-12">
      <Sidebar />
      <Ingredientspage />
    </div>
  );
}
