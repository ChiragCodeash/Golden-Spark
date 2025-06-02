"use client";
import Button from "@/components/Button";
import Image from "next/image";
import React, { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { HiOutlineArrowLeft } from "react-icons/hi";

const ProductTotalCard = ({
  title = "Stone Pointed Toe Rings",
  price = 578.0,
  sizes = ["S", "M", "L"],
  isPaymnetUI,
  btntext,
  navigate
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const deliveryFee = 578.0;
  const tax = 578.0;
  const router = useRouter();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };

  const total = price * quantity + deliveryFee + tax;

  return (
    <div className="mx-auto select-none border-2 border-gray-200 bg-white rounded-lg shadow-md overflow-hidden">
      {isPaymnetUI && (
        <div>
          <div className="bg-black hidden sm:block text-white p-4 text-2xl">
            {" "}
            Cart View
          </div>
          <div className="px-4 sm:px-9 pb-4 pt-7 sm:pt-12">
            <Button
              icon={<HiOutlineArrowLeft size={24} className="me-2" />}
              label="Back  TO CART"
              variant="outline"
              className="px-3 py-3 w-full border !text-black border-black"
              onClick={() => router.push("your-cart")}
            />
          </div>
        </div>
      )}
      {/* Product Header */}
      {/* <div className="p-6 border-b">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      </div> */}

      {/* Quantity Selector */}
      <div className="p-3">
        <div className="md:p-4 2xl:p-6">
          <div className="sm:flex justify-between ">
            <div className="md:w-1/2 lg:w-[40%] xl:w-[40%] 2xl:w-[50%] sm:pe-8 lg:pe-4">
              <div className="relative w-full md:w-full md:h-[200px] lg:h-[150px] sm:w-[170px] mx-auto xl:w-[150px] xl:h-[150px] 2xl:w-full 2xl:pe-10 2xl:h-[200px] h-[170px]">
                <Image
                  src="/images/shop_by_one.png"
                  alt="product"
                  fill
                  className="object-center w-full rounded-md"
                />
              </div>
            </div>
            <div className=" md:w-1/2  lg:w-[60%]  xl:w-[60%] 2xl:w-[50%]">
              <div className="text-xl pt-5 sm:p-0">
                Stone Pointed Toe Rings{" "}
              </div>
              <div className="flex items-center ">
                <p className="text-xl  py-4 pe-5">Quantity:</p>
                <div>
                  <div className="flex justify-center w-30 rounded-md items-center py-1 border px-3">
                    <p
                      className="text-xl cursor-pointer"
                      onClick={() => setQuantity(quantity - 1)}
                    >
                      <FiMinus />
                    </p>
                    <p className="px-4 text-xl">{quantity}</p>
                    <p
                      className="text-xl cursor-pointer"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <FiPlus />
                    </p>
                  </div>
                </div>
              </div>

              {/* Size Selector */}
              <div>
                <h3 className="text-lg xl:text-xl  text-gray-700 mb-3">Size</h3>
                <div className="flex space-x-3">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-7 py-2 rounded-md ${
                        selectedSize === size
                          ? "bg-yellow-800 text-white"
                          : " text-gray-800 border-1 cursor-pointer"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className=" text-xl flex items-center justify-between py-4">
                <p>Price</p>
                <p>${price.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="divider border-t md:mx-6"></div>
        {/* Price Breakdown */}
        <div className="my-5 md:m-6">
          <div className="space-y-4 text-xl ">
            <div className="flex justify-between">
              <span className="">Items</span>
              <span className="">${(price * quantity).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <p className="">Delivery</p>
              <span className="">${deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="">Tax</span>
              <span className="">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-4 border-t">
              <span className="text-lg font-bold">Total</span>
              <span className="text-lg font-bold">${total.toFixed(2)}</span>
            </div>
            <div>
              <Button
                label={btntext || "PLACE ORDER"}
                size="md"
                variant="solid"
                className="!bg-yellow-800 w-full !rounded-0 py:3 sm:py-3.5 mt-7 flex items-center gap-[10px]"
                onClick={() => {
                  router.push( navigate ? navigate : "payment");
                }}
              />{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTotalCard;
