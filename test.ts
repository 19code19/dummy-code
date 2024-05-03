// GridComponent.jsx
import React, { useCallback, useMemo, useState } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import CheckboxHeader from "./CheckboxHeader";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const GridComponent = () => {
  const [rowData, setRowData] = useState();
  const [gridApi, setGridApi] = useState(null);
  const [columnApi, setColumnApi] = useState(null);

  const onGridReady = useCallback((params) => {
    setGridApi(params.api);
    setColumnApi(params.columnApi);

    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => {
        setRowData(data);
      });
  }, []);

  const handleCheckboxChange = (isChecked) => {
    const selectedRows = [];
    gridApi.forEachNode((node) => {
      node.setSelected(isChecked);
      selectedRows.push(node.data);
    });
  };

  const columnDefs = useMemo(
    () => [
      { headerName: "Athlete", field: "athlete" },
      { headerName: "Age", field: "age" },
      { headerName: "Country", field: "country" },
      { headerName: "Year", field: "year" },
      { headerName: "Date", field: "date" },
      { headerName: "Sport", field: "sport" },
      { headerName: "Gold", field: "gold" },
      { headerName: "Silver", field: "silver" },
      { headerName: "Bronze", field: "bronze" },
      {
        headerName: "Total",
        field: "total",
        headerComponentFramework: CheckboxHeader,
        headerComponentParams: {
          onCheckboxChange: handleCheckboxChange,
        },
      },
    ],
    [gridApi]
  );

  return (
    <div className="ag-theme-alpine" style={{ height: "500px", width: "100%" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        onGridReady={onGridReady}
      />
    </div>
  );
};

export default GridComponent;









// CheckboxHeader.jsx
import React from "react";

const CheckboxHeader = ({ onCheckboxChange }) => {
  const handleCheckboxChange = (event) => {
    onCheckboxChange(event.target.checked);
  };

  return (
    <div className="ag-header-cell-label" role="presentation">
      All <input type="checkbox" id="checkbox" onChange={handleCheckboxChange} />
    </div>
  );
};

export default CheckboxHeader;
