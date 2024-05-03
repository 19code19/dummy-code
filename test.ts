import React, { useCallback, useMemo, useState, useRef } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import CheckboxHeader from "./CheckboxHeader";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const GridComponent = () => {
  const [rowData, setRowData] = useState();
  const gridApiRef = useRef(null);
  const columnApiRef = useRef(null);

  const onGridReady = useCallback((params) => {
    const { api, columnApi } = params;
    gridApiRef.current = api;
    columnApiRef.current = columnApi;

    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => {
        setRowData(data);
      });
  }, []);

  const handleCheckboxChange = (isChecked) => {
    const selectedRows = [];
    gridApiRef.current?.forEachNode((node) => {
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
    []
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
