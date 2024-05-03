import React from "react";

const CheckboxHeader = ({ onCheckboxChange }) => {
  return (
    <div className="ag-header-cell-label" role="presentation">
      All <input type="checkbox" id="checkbox" onChange={onCheckboxChange} />
    </div>
  );
};

export default CheckboxHeader;


{
      field: "total",
      headerComponentFramework: CheckboxHeader, // Use CheckboxHeader component as headerComponent
    },
