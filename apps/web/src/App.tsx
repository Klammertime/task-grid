// apps/web/src/App.tsx
import React from 'react';
import './App.css';
import { Grid } from './components/Grid';
import type { ColumnDef, RowData } from 'grid-core';

const columns: ColumnDef[] = [
  {
    id: 'name',
    label: 'Task',
  },
  {
    id: 'assignee',
    label: 'Assignee',
    renderCell: (value: string) => <strong>{value}</strong>,
    renderEditor: ({ value, onChange }) => (
      <input value={value} onChange={e => onChange(e.target.value)} />
    )
  }
];

const initialRows: RowData[] = [
  { id: '1', values: { name: 'Fix bug', assignee: 'Alice' } },
  { id: '2', values: { name: 'Write docs', assignee: 'Bob' } },
  { id: '3', values: { name: 'Test feature', assignee: 'Carol' } },
];

export default function App() {
  const [rows, setRows] = React.useState<RowData[]>(initialRows);
  const [selected, setSelected] = React.useState<RowData[]>([]);

  return (
    <div style={{ padding: 24 }}>
      <h1>Data Grid</h1>
      <Grid
        columns={columns}
        rows={rows}
        onChange={setRows}
        rowSelectionEnabled
        onRowSelect={setSelected}
      />
      <pre>{JSON.stringify(selected, null, 2)}</pre>
    </div>
  );
}
