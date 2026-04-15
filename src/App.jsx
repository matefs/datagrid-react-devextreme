import { useState } from 'react';
import Button from 'devextreme-react/button';
import Drawer from 'devextreme-react/drawer';
import List from 'devextreme-react/list';
import Tabs from 'devextreme-react/tabs';
import './App.css';
import 'devextreme/dist/css/dx.light.css';
import EmployeeDataGrid from './features/employees/EmployeeDataGrid';

const VIEWS = {
  HOME: 'home',
  EMPLOYEES: 'employees',
};

const MENU_ITEMS = [
  { id: VIEWS.HOME, text: 'Home' },
  { id: VIEWS.EMPLOYEES, text: 'Employees' },
];

const getMenuItemById = (id) => MENU_ITEMS.find((item) => item.id === id);

const renderView = (viewId) => {
  if (viewId === VIEWS.EMPLOYEES) {
    return (
      <>
        <h2 className="section-title">Employees</h2>
        <EmployeeDataGrid />
      </>
    );
  }

  return <div className="home-blank" />;
};

function App() {
  const [activeView, setActiveView] = useState(VIEWS.HOME);
  const [openTabs, setOpenTabs] = useState([getMenuItemById(VIEWS.HOME)]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const activeTabIndex = openTabs.findIndex((tab) => tab.id === activeView);

  const openViewInTab = (viewId) => {
    const menuItem = getMenuItemById(viewId);
    if (!menuItem) {
      return;
    }

    setOpenTabs((currentTabs) => {
      const tabAlreadyOpen = currentTabs.some((tab) => tab.id === viewId);
      return tabAlreadyOpen ? currentTabs : [...currentTabs, menuItem];
    });
    setActiveView(viewId);
  };

  const renderDrawerMenu = () => (
    <div className="drawer-menu">
      <List
        items={MENU_ITEMS}
        keyExpr="id"
        displayExpr="text"
        selectionMode="single"
        selectedItemKeys={[activeView]}
        focusStateEnabled={false}
        activeStateEnabled={true}
        onItemClick={(event) => openViewInTab(event.itemData.id)}
      />
    </div>
  );

  return (
    <main className="app-shell">
      <header className="app-header">
        <Button
          icon="menu"
          stylingMode="text"
          onClick={() => setIsDrawerOpen((current) => !current)}
          hint={isDrawerOpen ? 'Retrair menu' : 'Expandir menu'}
        />
        <h1 className="app-title">DataGrid Workspace</h1>
      </header>

      <Drawer
        opened={isDrawerOpen}
        openedStateMode="shrink"
        revealMode="expand"
        position="left"
        shading={false}
        closeOnOutsideClick={false}
        minSize={0}
        maxSize={220}
        render={renderDrawerMenu}
        onOptionChanged={(event) => {
          if (event.name === 'opened') {
            setIsDrawerOpen(event.value);
          }
        }}
      >
        <section className="app-content">
          <Tabs
            className="app-tabs"
            items={openTabs}
            keyExpr="id"
            displayExpr="text"
            scrollingEnabled={true}
            showNavButtons={true}
            selectedIndex={activeTabIndex < 0 ? 0 : activeTabIndex}
            onItemClick={(event) => setActiveView(event.itemData.id)}
          />

          <div className="view-panel">
            {renderView(activeView)}
          </div>
        </section>
      </Drawer>
    </main>
  );
}

export default App;
