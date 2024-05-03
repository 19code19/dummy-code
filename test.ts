// Define a custom header component with a button
class CustomHeaderComponent {
  constructor() {
    this.eGui = document.createElement('div');
    this.eGui.innerHTML = `
      <div class="custom-header">
        <button class="custom-button">My Button</button>
      </div>
    `;
    this.button = this.eGui.querySelector('.custom-button');
    this.button.addEventListener('click', this.onButtonClick.bind(this));
  }

  // Method to handle button click event
  onButtonClick() {
    alert('Custom button clicked!');
  }

  // Mandatory method to return the GUI of the custom header component
  getGui() {
    return this.eGui;
  }

  // Optional lifecycle method called when the header component is destroyed
  destroy() {
    // Clean up any resources or event listeners here
    this.button.removeEventListener('click', this.onButtonClick);
  }
}

// Column definition with custom header component
const columnDefs = [
  {
    headerComponentFramework: CustomHeaderComponent,
    field: 'checkbox', // Field for data binding, can be any existing field or custom
    headerCheckboxSelection: true,
    headerCheckboxSelectionFilteredOnly: true,
    checkboxSelection: true,
    width: 50,
  },
  // Other column definitions...
];

// AG Grid options
const gridOptions = {
  // Specify other grid options...
};
