import { useState } from 'react';
import './App.css';
import {DataGrid, SearchPanel} from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.dark.css';
import { employeeData } from "./employeeData.js";
function App() {

  return (
    <>
      <p className="read-the-docs">Devextreme react datagrid</p>
      <DataGrid
        dataSource={employeeData}
        keyExpr="EmployeeID"
        columnHidingEnabled={true}
        editing={{ allowUpdating: true }}
      >
          <SearchPanel visible={true} /> 
      </DataGrid>
    </>
  );
}

export default App;
