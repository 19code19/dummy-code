import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const MyGridComponent = () => {
  const [gridApi, setGridApi] = useState(null);
  const [columnDefs] = useState([
    { headerName: '', field: 'checkbox', headerCheckboxSelection: true, checkboxSelection: true, width: 40 },
    { headerName: 'Column 1', field: 'col1' },
    { headerName: 'Column 2', field: 'col2' }
  ]);

  const onGridReady = params => {
    setGridApi(params.api);
    // Fetch data from the server and set it using params.api.setServerSideDatasource(...)
  };

  const handleHeaderCheckboxChange = (event) => {
    const isSelected = event.target.checked;
    const selectedNodes = [];
    gridApi.forEachNodeAfterFilterAndSort(node => {
      selectedNodes.push(node);
    });
    selectedNodes.forEach(node => {
      node.setSelected(isSelected);
    });
  };

  return (
    <div className="ag-theme-alpine" style={{ height: '400px', width: '600px' }}>
      <AgGridReact
        columnDefs={columnDefs}
        onGridReady={onGridReady}
        rowSelection="multiple"
        serverSideStoreType="partial"
        // Add server-side row model configurations here
      />
      <div className="header-checkbox">
        <input type="checkbox" onChange={handleHeaderCheckboxChange} />
        <span>Select All</span>
      </div>
    </div>
  );
};

export default MyGridComponent;
