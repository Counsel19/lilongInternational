import React from "react";
import { GrAdd } from "react-icons/gr";
import AddButtonStyles from "../../styles/admin/AddButton.module.css";

const AddButton = () => {
  return (
    <div className={AddButtonStyles.container}>
      <span className={AddButtonStyles.addBtn}>
        <GrAdd size={25} />
      </span>
      <span className="ml-5"> Add Product</span>
    </div>
  );
};

export default AddButton;
