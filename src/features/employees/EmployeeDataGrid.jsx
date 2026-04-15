import {
  DataGrid,
  SearchPanel,
  ColumnChooser,
  Toolbar,
  Item,
  StateStoring,
  Paging,
  Pager,
  Editing,
  Column,
  Button,
} from 'devextreme-react/data-grid';
import { employeeData } from './employeeData';
import { saveEmployeeGridState, loadEmployeeGridState } from './gridStateStorage';

export default function EmployeeDataGrid() {
  return (
    <DataGrid
      dataSource={employeeData}
      keyExpr="EmployeeID"
      columnHidingEnabled={true}
      allowColumnReordering={true}
    >
      <Editing mode="row" allowUpdating={true} useIcons={true} />

      <Column dataField="EmployeeID" allowEditing={false} />
      <Column dataField="FullName" allowEditing={true} />
      <Column dataField="Country" allowEditing={true} />
      <Column dataField="HomePhone" allowEditing={true} />
      <Column dataField="Extension" allowEditing={true} />
      <Column dataField="Photo" allowEditing={true} />
      <Column dataField="Notes" allowEditing={true} />
      <Column dataField="ReportsTo" allowEditing={true} />

      <Column type="buttons" width={110}>
        <Button name="edit" />
        <Button name="save" />
        <Button name="cancel" />
      </Column>

      <StateStoring
        enabled={true}
        type="custom"
        customSave={saveEmployeeGridState}
        customLoad={loadEmployeeGridState}
      />

      <Paging defaultPageSize={10} />
      <Pager
        visible={true}
        showPageSizeSelector={true}
        allowedPageSizes={[5, 10, 20]}
        showInfo={true}
        showNavigationButtons={true}
      />

      <SearchPanel visible={true} />
      <ColumnChooser enabled={true} mode="dragAndDrop" allowSearch={true} />

      <Toolbar>
        <Item name="columnChooserButton" />
      </Toolbar>
    </DataGrid>
  );
}
