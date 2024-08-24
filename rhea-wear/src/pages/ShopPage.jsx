import React from "react";

import ShopImageSection from "../components/ShopImageSection";
import DropDownSort from "../components/DropDownSort";
import Clients from "../components/Clients";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGrip, faListUl } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductList from "../components/ProductList";

function ShopPage() {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />
      <div className="pt-32 sm:px-10 px-40">
        <div>
          <div className="py-3 flex justify-between sm:flex-col">
            <h2 className="text-[#252B42] font-bold text-2xl">Shop</h2>
            <div className="text-sm font-semibold flex items-center mt-2">
              <a href="#" className="text-gray-400 hover:text-[#252B42]">
                Home
              </a>
              <span className="text-gray-400 mx-1">{">"}</span>
              <a href="#" className="text-gray-400 hover:text-[#252B42]">
                Shop
              </a>
            </div>
          </div>

          <ShopImageSection />

          <section className="flex justify-between items-center py-5 sm:flex sm:flex-col sm:gap-4">
            <div>
              <p className="text-sm text-gray-500 font-bold">
                Showing all results
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <h4 className="mr-1 text-sm text-gray-500 font-bold">Views:</h4>
              <div className="flex gap-2">
                <FontAwesomeIcon
                  icon={faGrip}
                  size="lg"
                  className="border border-gray-300 rounded-md p-1 cursor-pointer hover:bg-gray-200 text-[#252B42]"
                />
                <FontAwesomeIcon
                  icon={faListUl}
                  size="lg"
                  className="border border-gray-300 rounded-md p-1 cursor-pointer hover:bg-gray-200 text-gray-500"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <DropDownSort />
              <button className="inline-flex justify-center gap-x-1.5 rounded-md bg-[#23A6F0] px-3 py-2 text-sm font-semibold text-gray-50 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-sky-300">
                Filter
              </button>
            </div>
          </section>
        </div>
        <ProductList />
      </div>
      <div className="w-full bg-zinc-100">
        <Clients />
      </div>
    </div>
  );
}

export default ShopPage;
