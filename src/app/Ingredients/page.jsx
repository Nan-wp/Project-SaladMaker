"use client";
import Sidebar from "../components/Sidebar";
import Ingredientspage from "./components/Ingredientspage";

export default function page() {
  return (
    <>
      <div className="grid grid-cols-12">
        <Sidebar />
        <Ingredientspage />
      </div>
    </>
  );
}
