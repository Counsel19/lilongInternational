import React, { useEffect } from "react";
import { FormRow, FormRowSelect } from ".";
import { useAppContext } from "../../../context/AppContext";

const SearchContainer = ({ customers }) => {
  const {
    isLoading,
    timeFilter,
    orderStatusFilter,
    search,
    sort,
    sortOptions,
    handleInputChange,
    clearFilters,
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
            name="search"
            labelText="Order Search"
            value={search}
            handleChange={handleSearch}
          />

          {/* Search by Order Status */}

          {!customers && (
            <FormRowSelect
              labelText="Order Status"
              name="orderStatusFilter"
              value={orderStatusFilter}
              handleChange={handleSearch}
              list={["processing", "dispatched", "delivered"]}
            />
          )}
          {/* Search by Time Filter*/}

          {!customers && (
            <FormRowSelect
              labelText="Time Filter"
              name="timeFilter"
              value={timeFilter}
              handleChange={handleSearch}
              list={["today", "this week", "this month", "this year"]}
            />
          )}

          {/* Sort */}
          {!customers && (
            <FormRowSelect
              labelText="Sort"
              name="sort"
              value={sort}
              handleChange={handleSearch}
              list={sortOptions}
            />
          )}
          {!customers && (
            <button
              className=" h-10  w-full md:w-1/4 lg:w-1/5 mt-6 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-1 px-2 border border-red-500 hover:border-transparent rounded"
              disabled={isLoading}
              onClick={handleSubmit}
            >
              clear filters
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SearchContainer;
