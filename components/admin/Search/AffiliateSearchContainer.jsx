import React, { useEffect } from "react";
import { FormRow, FormRowSelect } from ".";
import { useAppContext } from "../../../context/AppContext";

const AffiliateSearchContainer = () => {
  const {
    isLoading,
    timeFilter,
    affiliateStatusFilter,
    affiliatePlanFilter,
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
    <div className="w-full">
      <form className="w-full mb-4">
        <h4 className="text-lg font-semibold text-gray-600 mb-3">
          Search form
        </h4>
        <div className="form-center flex gap-8 flex-wrap items-center">
          {/* Search input */}
          <FormRow
            type="search"
            name="search"
            labelText="Affiliate Search"
            value={search}
            handleChange={handleSearch}
          />

          {/* Search by Order Status */}

          <FormRowSelect
            labelText="Affiliate Plan"
            name="affiliatePlanFilter"
            value={affiliatePlanFilter}
            handleChange={handleSearch}
            list={["Starter Plan", "Standard Plan", "Advanced Plan"]}
          />

          {/* Search by Time Filter*/}

          <FormRowSelect
            labelText="Affiliate Status"
            name="affiliateStatusFilter"
            value={affiliateStatusFilter}
            handleChange={handleSearch}
            list={["pending", "completed"]}
          />
          
          <FormRowSelect
            labelText="Time Filter"
            name="timeFilter"
            value={timeFilter}
            handleChange={handleSearch}
            list={["today", "this week", "this month", "this year"]}
          />

          {/* Sort */}

          <FormRowSelect
            labelText="Sort"
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />

          <button
            className=" h-10  w-full md:w-1/4 lg:w-1/5 mt-6 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-1 px-2 border border-red-500 hover:border-transparent rounded"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </div>
  );
};

export default AffiliateSearchContainer;
