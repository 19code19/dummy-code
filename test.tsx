import React from 'react';
import { ICellRendererParams } from 'ag-grid-community';

const CheckboxRenderer: React.FC<ICellRendererParams> = (props) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.checked ? 'yes' : 'no';
        props.node.setDataValue(props.colDef.field, newValue);
    };

    return (
        <input
            type="checkbox"
            checked={props.value === 'yes'}
            onChange={handleChange}
        />
    );
};

export default CheckboxRenderer;




import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import CheckboxRenderer from './CheckboxRenderer';

const MyGrid: React.FC = () => {
    const [rowData, setRowData] = useState([
        { status: 'yes' },
        { status: 'no' },
        // Your row data here
    ]);

    const columnDefs: ColDef[] = [
        {
            headerName: 'Status',
            field: 'status',
            cellRendererFramework: CheckboxRenderer,
            // Add other column properties as needed
        },
        // Other columns...
    ];

    const onCellValueChanged = (params: any) => {
        const newData = [...rowData];
        newData[params.node.rowIndex] = params.data;
        setRowData(newData);
    };

    return (
        <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                onCellValueChanged={onCellValueChanged}
            />
        </div>
    );
};

export default MyGrid;
