const GRID_COLUMNS_STORAGE_KEY = 'employee-grid-columns-config';

export const saveEmployeeGridState = (gridState) => {
  const storageObject = {
    version: 1,
    updatedAt: new Date().toISOString(),
    removedColumns: (gridState?.columns || [])
      .filter((column) => column.visible === false)
      .map((column) => column.dataField || column.name || column.caption)
      .filter(Boolean),
    gridState,
  };

  localStorage.setItem(GRID_COLUMNS_STORAGE_KEY, JSON.stringify(storageObject));
};

export const loadEmployeeGridState = () => {
  const savedConfig = localStorage.getItem(GRID_COLUMNS_STORAGE_KEY);

  if (!savedConfig) {
    return null;
  }

  try {
    const parsedConfig = JSON.parse(savedConfig);
    return parsedConfig?.gridState || null;
  } catch {
    return null;
  }
};
