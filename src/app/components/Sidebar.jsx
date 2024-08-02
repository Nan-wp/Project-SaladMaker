"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({ params }) {
  const pathName = usePathname();
  const temp = pathName.split("/");
  const id = temp[2];

  return (
    <div className="col-span-3  ">
      <div className="flex m-6">
        <p className="text-3xl font-bold text-[#012738]">SALADMAKER</p>
        <p className="text-yellow-400 text-3xl font-bold">.</p>
      </div>
      <Link href={"/Ingredients"}>
        <div
          className={
            pathName === "/Ingredients"
              ? "flex justify-center rounded-xl text-white cursor-pointer bg-[#F8B602] w-[200px] m-6 p-2"
              : "flex justify-center rounded-xl w-[200px] m-6 p-2 text-gray-400 cursor-pointer "
          }
        >
          <div className="flex justify-center">
            <Image
              width={30}
              height={30}
              src={
                pathName === "/Ingredients"
                  ? "/svg/saladlogo.svg"
                  : "/svg/logogray.svg"
              }
            />
          </div>
          <p
            className={
              pathName === "/Ingredients"
                ? "p-2 text-white pl-6 font-medium"
                : "p-2 text-gray-400  pl-6 font-medium"
            }
          >
            Salad maker
          </p>
        </div>
      </Link>
      <Link href={"/recipe"}>
        <div
          className={
            pathName === "/recipe" || pathName === `/editrecipe/${id}`
              ? "flex justify-center rounded-xl cursor-pointer text-white  bg-[#F8B602] w-[200px] m-6 p-2"
              : "flex justify-center rounded-xl w-[200px] m-6 text-gray-400 p-2 cursor-pointer "
          }
        >
          <div
            className={
              pathName === "/recipe" || pathName === `/editrecipe/${id}`
                ? "flex justify-center pr-6 text-white"
                : "flex justify-center pr-6 text-gray-400"
            }
          >
            <Image
              width={25}
              height={25}
              src={
                pathName === "/Ingredients"
                  ? "/svg/recipe.svg"
                  : "/svg/logowhite.svg"
              }
            />
          </div>
          <p
            className={
              pathName === "/recipe" || pathName === `/editrecipe/${id}`
                ? "p-2 text-white pr-10 font-medium"
                : "p-2 text-gray-400  pr-10 font-medium"
            }
          >
            Recipe
          </p>
        </div>
      </Link>
    </div>
  );
}
