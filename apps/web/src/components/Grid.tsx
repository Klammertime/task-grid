import React, { useState } from 'react';
import type { ColumnDef, RowData } from 'grid-core';

interface GridProps {
    columns: ColumnDef[];
    rows: RowData[];
    onChange?: (rows: RowData[]) => void;
    rowSelectionEnabled?: boolean;
    onRowSelect?: (selectedRows: RowData[]) => void;
}

export const Grid = ({
    columns,
    rows,
    onChange,
    rowSelectionEnabled = false,
    onRowSelect
}: GridProps) => {
    const [selectedRowIds, setSelectedRowIds] = useState<Set<string>>(new Set());

    const handleRowClick = (row: RowData) => {
        if (!rowSelectionEnabled) return;
        const updated = new Set(selectedRowIds);
        if (updated.has(row.id)) updated.delete(row.id);
        else updated.add(row.id);
        setSelectedRowIds(updated);
        onRowSelect?.(rows.filter(r => updated.has(r.id)));
    };

    const handleCellChange = (rowId: string, columnId: string, newValue: any) => {
        const updated = rows.map(row => {
            if (row.id === rowId) {
                return {
                    ...row,
                    values: {
                        ...row.values,
                        [columnId]: newValue
                    }
                };
            }
            return row;
        });
        onChange?.(updated);
    };

    return (
        <table className="grid-table">
            <thead>
                <tr>
                    {rowSelectionEnabled && <th></th>}
                    {columns.map(col => (
                        <th key={col.id}>{col.label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map(row => {
                    const isSelected = selectedRowIds.has(row.id);
                    return (
                        <tr
                            key={row.id}
                            className={isSelected ? 'selected' : ''}
                            onClick={() => handleRowClick(row)}
                        >
                            {rowSelectionEnabled && (
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={() => handleRowClick(row)}
                                        onClick={e => e.stopPropagation()}
                                    />
                                </td>
                            )}
                            {columns.map(col => (
                                <td key={col.id}>
                                    {col.renderEditor ? (
                                        col.renderEditor({
                                            value: row.values[col.id],
                                            onChange: newVal => handleCellChange(row.id, col.id, newVal),
                                            onCancel: () => { } // optional cancel hook
                                        })
                                    ) : col.renderCell ? (
                                        col.renderCell(row.values[col.id], row)
                                    ) : (
                                        String(row.values[col.id] ?? '')
                                    )}
                                </td>
                            ))}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default Grid;
