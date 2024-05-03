// Column definition with custom cell renderer for checkbox and selection logic
const columnDefs = [
  {
    headerName: '',
    field: 'checkbox',
    cellRenderer: function(params) {
      // Function to toggle selection status
      function toggleSelection() {
        params.data.selected = !params.data.selected;
        // Refresh the row to reflect the changes
        params.api.refreshCells({ rowNodes: [params.node], force: true });
      }

      // Initial checkbox state based on selection status
      const checked = params.data.selected ? 'checked' : '';

      // Return HTML for the checkbox
      return `<input type="checkbox" ${checked} onchange="(${toggleSelection})()" />`;
    },
  },
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
