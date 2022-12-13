import React, { useEffect } from "react";
import { FormRow, FormRowSelect } from ".";
import { useAppContext } from "../../../context/AppContext";

const ProductSearchContainer = ({ categories, prices }) => {
  const {
    isLoading,
    search,
    productPriceFilter,
    productCategoryFilter,
    productInstockFilter,
    handleInputChange,
    clearFilters
  } = useAppContext();

  const handleSearch = (e) => {
    if (isLoading) return;
    let name = e.target.name;
    let value = e.target.value;
    handleInputChange(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearFilters();
  };
  return (
    <div className="">
      <form className="w-full mb-8">
        <h4 className="text-lg font-semibold text-gray-600 mb-3">
          Search form
        </h4>
        <div className="form-center w-full flex flex-wrap gap-8 items-center ">
          {/* Search input */}
          <FormRow
            type="search"
            labelText="Product Search"
            name="search"
            value={search}
            handleChange={handleSearch}
          />

          {/* Search by Order Status */}

          <FormRowSelect
            labelText="Price Filter"
            name="productPriceFilter"
            value={productPriceFilter}
            handleChange={handleSearch}
            list={prices}
          />

          {/* Search by Time Filter*/}

          <FormRowSelect
            labelText="Category Filter"
            name="productCategoryFilter"
            value={productCategoryFilter}
            handleChange={handleSearch}
            list={categories}
          />

          <FormRowSelect
            labelText="Status Filter"
            name="productInstockFilter"
            value={productInstockFilter}
            handleChange={handleSearch}
            list={["in stock", "out of Stock"]}
          />

          <button
            className=" h-10  w-full md:w-1/4 lg:w-1/5 mt-6 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-1 px-2 border border-red-500 hover:border-transparent rounded"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            Clear filters
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductSearchContainer;
