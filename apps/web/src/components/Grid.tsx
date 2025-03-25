import React, { useState } from 'react';
import type { ColumnDef, RowData } from 'grid-core';
import { fieldRegistry } from 'grid-core';
import './Grid.css';

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
        <div className="grid">
            <div className="grid-header">
                {rowSelectionEnabled && <div className="grid-cell checkbox-col"></div>}
                {columns.map(col => (
                    <div key={col.id} className="grid-cell header-cell">{col.label}</div>
                ))}
            </div>
            <div className="grid-body">
                {rows.map(row => {
                    const isSelected = selectedRowIds.has(row.id);
                    return (
                        <div
                            key={row.id}
                            className={`grid-row ${isSelected ? 'selected' : ''}`}
                            onClick={() => handleRowClick(row)}
                        >
                            {rowSelectionEnabled && (
                                <div className="grid-cell checkbox-col" onClick={e => e.stopPropagation()}>
                                    <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={() => handleRowClick(row)}
                                    />
                                </div>
                            )}
                            {columns.map(col => {
                                const value = row.values[col.id];
                                const fieldConfig = fieldRegistry[col.fieldType] ?? {};
                                const renderEditor = col.renderEditor || fieldConfig.renderEditor;
                                const renderCell = col.renderCell || fieldConfig.renderCell;

                                return (
                                    <div
                                        key={col.id}
                                        className="grid-cell"
                                        onClick={e => e.stopPropagation()}
                                    >
                                        {renderEditor ? (
                                            renderEditor({
                                                value,
                                                row,
                                                column: col,
                                                onChange: newVal => handleCellChange(row.id, col.id, newVal),
                                                onCancel: () => { }
                                            })
                                        ) : renderCell ? (
                                            renderCell(value, row, col)
                                        ) : (
                                            String(value ?? '')
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );

};

export default Grid;
