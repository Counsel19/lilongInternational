import React from "react";
import { useAppContext } from "../../context/AppContext";
import EntriesStyles from "../../styles/admin/EntriesFilter.module.css";

const EntriesFilter = ({ total }) => {
  const { limit, handleInputChange } = useAppContext();
  return (
    <div className={EntriesStyles.container}>
      Show
      <input
        type="number"
        value={limit}
        onChange={(e) => handleInputChange("limit", e.target.value)}
      />
      Entries Out of {total}
    </div>
  );
};

export default EntriesFilter;
