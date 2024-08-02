export function getData(): any[] {
    return [
        { row: 'Row 1', name: true },
        { row: 'Row 2', name: true },
        { row: 'Row 3', name: true},
        { row: 'Row 4', name: true },
        { row: 'Row 5', name: true },
        { row: 'Row 6', name: true},
        { row: 'Row 7', name: false },
        { row: 'Row 8', name: false},
        { row: 'Row 9', name: false },
        { row: 'Row 10', name: false},
        { row: 'Row 11', name: false },
        { row: 'Row 12', name: false },
        { row: 'Row 13', name: false },
        { row: 'Row 14', name: false },
    ];
}



import { IDoesFilterPassParams } from '@ag-grid-community/core';
import { CustomFilterProps, useGridFilter } from '@ag-grid-community/react';
import React, { ChangeEvent, forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

type RadioFilterModel = {
    selectedValue: string;
};

export default forwardRef(({ model, onModelChange, getValue }: CustomFilterProps<any, any, RadioFilterModel>, ref) => {
    const refInput = useRef<HTMLInputElement>(null);

    const doesFilterPass = useCallback(
        ({ node }: IDoesFilterPassParams) => {
            const value = getValue(node).toString().toLowerCase();
            return model!.selectedValue === '' || model!.selectedValue.toLowerCase() === value;
        },
        [model]
    );

    const afterGuiAttached = useCallback(() => {
        window.setTimeout(() => {
            refInput.current?.focus();
        });
    }, []);

    useGridFilter({
        doesFilterPass,
        afterGuiAttached,
    });

    useImperativeHandle(ref, () => {
        return {
            componentMethod(message: string) {
                alert(`Alert from RadioFilterComponent: ${message}`);
            },
        };
    });

    const onChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
        onModelChange({ selectedValue: value });
    };

    const onClear = () => {
        onModelChange({ selectedValue: '' }); // Clear the filter
    };

    const style = {
        borderRadius: '5px',
        width: '200px',
        height: '150px',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
    };

    return (
        <div style={style}>
            Radio Button Filter:
            <div>
                <label>
                    <input
                        type="radio"
                        name="filterOption"
                        value='true'
                        checked={model?.selectedValue === 'true'}
                        onChange={onChange}
                        className="form-control"
                    />
                    Option 1
                </label>
            </div>
            <div>
                <label>
                    <input
                        type="radio"
                        name="filterOption"
                        value="false"
                        checked={model?.selectedValue === 'false'}
                        onChange={onChange}
                        className="form-control"
                    />
                    Option 2
                </label>
            </div>
            {/* Add more radio options if needed */}
            <button onClick={onClear} style={{ marginTop: '10px' }}>
                Clear
            </button>
        </div>
    );
});






'use strict';

import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ColDef, ColGroupDef, IFilter } from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { AgGridReact, getInstance } from '@ag-grid-community/react';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-quartz.css';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

import { getData } from './data.tsx';
import PartialMatchFilter from './partialMatchFilter';
import './styles.css';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const GridExample = () => {
    const gridRef = useRef<AgGridReact>(null);
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const [rowData, setRowData] = useState<any[]>(getData());
    const [columnDefs, setColumnDefs] = useState<(ColDef | ColGroupDef)[] | null>([
        { field: 'row' },
        {
            field: 'name',
            filter: PartialMatchFilter,
        },
    ]);
    const defaultColDef = useMemo<ColDef>(() => {
        return {
            editable: true,
            flex: 1,
            minWidth: 100,
            filter: true,
        };
    }, []);

    const onClicked = useCallback(() => {
        gridRef.current!.api.getColumnFilterInstance('name').then((instance) => {
            getInstance<IFilter, IFilter & { componentMethod(message: string): void }>(instance!, (component) => {
                if (component) {
                    component.componentMethod('Hello World!');
                }
            });
        });
    }, []);

    return (
        <div style={containerStyle}>
            <div className="example-wrapper">
                <button style={{ marginBottom: '5px' }} onClick={onClicked} className="btn btn-primary">
                    Invoke Filter Instance Method
                </button>

                <div
                    style={gridStyle}
                    className={
                        "ag-theme-quartz-dark"
                    }
                >
                    <AgGridReact
                        ref={gridRef}
                        rowData={rowData}
                        columnDefs={columnDefs}
                        defaultColDef={defaultColDef}
                    />
                </div>
            </div>
        </div>
    );
};

const root = createRoot(document.getElementById('root')!);
root.render(<GridExample />);
