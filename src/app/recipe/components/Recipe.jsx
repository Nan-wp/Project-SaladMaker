"use client";
import Modal from "@/app/components/Modal";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Swal from "sweetalert2";

export default function Recipe({ recipeData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [recipeToDelete, setRecipeToDelete] = useState(null);
  const [isLoding, setIsLoding] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleDelete = (recipeId) => {
    setRecipeToDelete(recipeId);
    setModalMode("delete");
    toggleModal();
  };
  const confirmDelete = async () => {
    setIsLoding(true);
    if (recipeToDelete) {
      try {
        const response = await fetch(`/api/recipe/${recipeToDelete}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete recipe");
        }
        setIsModalOpen(false);
        Swal.fire({
          title: "Success!",
          text: "Recipe deleted successfully",
          icon: "success",
          confirmButtonText: "OK",
        });

        // Close the modal
        toggleModal();
      } catch (error) {
        console.error("Error deleting recipe:", error);
        // Handle error (e.g., show error message to user)
      } finally {
        setIsLoding(false);
      }
    }
  };

  return (
    <div className="grid col-span-9 h-screen">
      <div className="bg-gray-200 p-6 col-span-12 ">
        <div className="font-extrabold text-3xl">Recipe</div>
        <div className="bg-white m-8 p-4 rounded-lg">
          <div className="font-extrabold text-xl p-4">Your Recipe</div>
          {/*contain card */}
          {isLoding ? null : (
            <div className="bg-white grid grid-cols-12 gap-4 max-sm:grid-cols-1 max-md:grid-cols-1 max-2xl:grid-cols-3 max-xl:grid-cols-2">
              {recipeData.map((item, index) => {
                return (
                  <div key={item.id} className="col-span-3">
                    <div className="relative">
                      <Image
                        width={300}
                        height={300}
                        src="/image/background.png"
                        className="rounded-2xl shadow-md"
                      />
                      <div className="flex flex-col bg-white w-[250px] h-[100px] rounded-lg absolute top-5 inset-x-6">
                        <p className="text-sm pt-2 pl-2">{item.name}</p>
                        <div className="flex gap-2 p-2">
                          <p className="font-bold text-xl">{item.calorie}</p>
                          <p className="text-[#F8B602] font-bold text-xl">
                            Cal
                          </p>
                        </div>
                      </div>

                      <div className="flex w-[250px] h-[120px] gap-2 absolute  inset-x-4 inset-y-56">
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="pb-1"
                        >
                          <Image
                            width={143}
                            height={40}
                            src="/svg/delete.svg"
                            alt="deletebutton"
                          />
                        </button>
                        <Link href={`/editrecipe/${item.id}`}>
                          <button className="pt-10">
                            <Image
                              width={143}
                              height={40}
                              src="/svg/edit.svg"
                              alt="editbutton"
                            />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        toggle={toggleModal}
        mode={modalMode}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
