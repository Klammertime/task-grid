// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
// ┃            Grid Rendering Engine           ┃
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

/*
<Grid columns={columns} rows={rows} />

Column Definition:
{
  id: 'assignee',
  label: 'Assignee',
  fieldType: 'user',
  renderCell: (value, row) => <UserAvatar value={value} />,
  renderEditor: (value, onChange) => <UserSelect value={value} onChange={onChange} />
}

Row:
{
  id: '1',
  values: {
    name: 'Fix bug',
    assignee: [userId1, userId2],
    ...
  }
}

Registry? We can define field renderers in grid-core/registry.ts
*/
