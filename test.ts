// Custom cell renderer for checkbox
function checkboxRenderer(params) {
  const selected = params.data.selected ? 'checked' : '';
  return `<input type="checkbox" ${selected} />`;
}

// Column definition
const columnDefs = [
  { headerName: '', field: 'checkbox', cellRenderer: checkboxRenderer },
  // Other column definitions...
];

// Data with a selected property for each row
const rowData = [
  { id: 1, name: 'Row 1', selected: false },
  { id: 2, name: 'Row 2', selected: false },
  // More rows...
];

// Grid options
const gridOptions = {
  columnDefs: columnDefs,
  rowData: rowData,
  // Other grid options...
};
