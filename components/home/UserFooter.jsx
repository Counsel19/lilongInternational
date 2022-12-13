import Link from "next/link";
import React from "react";
import { BsTwitter, BsInstagram, BsWhatsapp } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
const now = new Date();
const UserFooter = () => {
  return (
    <footer className="relative bg-gray-100 pt-8 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap text-left lg:text-left">
          <div className="w-full lg:w-6/12 px-4">
            <h4 className="text-3xl fonat-semibold text-gray-700">
              Lets keep in touch!
            </h4>
            <h5 className="text-lg mt-0 mb-2 text-gray-600">
              Find us on any of these platforms.
            </h5>
            <div className="mt-6 flex gap-4 lg:mb-0 mb-6">
              <button
                className="bg-white flex text-blue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <BsTwitter />
              </button>
              <button
                className="bg-white flex text-blue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <BsInstagram />
              </button>
              <button
                className="bg-white  flex text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <FaFacebookF />
              </button>
              <button
                className="bg-white flex text-gray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <BsWhatsapp />
              </button>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="flex flex-wrap items-top mb-6">
              <div className="w-full lg:w-4/12 px-4 ml-auto">
                <span className="block uppercase text-gray-500 text-sm font-semibold mb-2">
                  Useful Links
                </span>

                <div className="list-unstyled">
                  <Link href="/products">
                    <a className="text-gray-600 hover:text-gray-800 font-semibold block pb-2 text-sm">
                      All Products
                    </a>
                  </Link>

                  <Link href="/consult">
                    <a className="text-gray-600 hover:text-gray-800 font-semibold block pb-2 text-sm">
                      Consult Therapist
                    </a>
                  </Link>
                  <Link href="/become-an-affiliate">
                    <a className="text-gray-600 hover:text-gray-800 font-semibold block pb-2 text-sm">
                      Be an Affiliate
                    </a>
                  </Link>
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <span className="block uppercase text-gray-500 text-sm font-semibold mb-2">
                  Account
                </span>
                <div className="">
                <Link href="/profile">
                    <a className="text-gray-600 hover:text-gray-800 font-semibold block pb-2 text-sm">
                      Y
                    </a>
                  </Link>
                <Link href="/become-an-affiliate">
                    <a className="text-gray-600 hover:text-gray-800 font-semibold block pb-2 text-sm">
                      Be an Affiliate
                    </a>
                  </Link>
                <Link href="/become-an-affiliate">
                    <a className="text-gray-600 hover:text-gray-800 font-semibold block pb-2 text-sm">
                      Be an Affiliate
                    </a>
                  </Link>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-300" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm text-gray-500 font-semibold py-1">
              Copyright © <span id="get-current-year">{now.getFullYear()}</span>
              <a
                href="https://www.creative-tim.com/product/notus-js"
                className="text-gray-500 hover:text-gray-800"
                target="_blank"
                rel="noreferrer"
              />{" "}
              Lilong International
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default UserFooter;
