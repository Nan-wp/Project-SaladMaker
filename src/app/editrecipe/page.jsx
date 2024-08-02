import React from "react";
import EditRecipe from "./component/EditRecipe";

export default function page() {
  return (
    <div className="grid grid-cols-12">
      <EditRecipe />
    </div>
  );
}
