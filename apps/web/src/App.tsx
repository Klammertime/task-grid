import React, { useState } from 'react';
import Grid from './components/Grid';
import type { ColumnDef, RowData } from 'grid-core';

const initialColumns: ColumnDef[] = [
  { id: 'id', label: 'ID', fieldType: 'text' },
  { id: 'title', label: 'Title', fieldType: 'text' },
  { id: 'assignee', label: 'Assignee', fieldType: 'user' },
];

const initialRows: RowData[] = [
  {
    id: '1',
    values: {
      id: 'TK-001',
      title: 'Fix dropdown bug',
      assignee: ['kenny', 'gabrie'],
    },
  },
  {
    id: '2',
    values: {
      id: 'TK-002',
      title: 'Design profile screen',
      assignee: ['zico'],
    },
  },
];

const App = () => {
  const [rows, setRows] = useState(initialRows);

  return (
    <div style={{ padding: 32 }}>
      <h2>🧪 Task Grid</h2>
      <Grid
        columns={initialColumns}
        rows={rows}
        onChange={setRows}
        rowSelectionEnabled
      />
    </div>
  );
};

export default App;
