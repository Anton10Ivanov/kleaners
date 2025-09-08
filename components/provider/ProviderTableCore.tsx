'use client'

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Edit, Trash2, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ProviderTableColumn<T = any> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export interface ProviderTableAction<T = any> {
  label: string;
  icon?: React.ReactNode;
  onClick: (row: T) => void;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  condition?: (row: T) => boolean;
}

interface ProviderTableCoreProps<T = any> {
  data: T[];
  columns: ProviderTableColumn<T>[];
  actions?: ProviderTableAction<T>[];
  onRowClick?: (row: T) => void;
  className?: string;
}

export function ProviderTableCore<T = any>({
  data,
  columns,
  actions = [],
  onRowClick,
  className
}: ProviderTableCoreProps<T>) {
  const renderCellValue = (column: ProviderTableColumn<T>, row: T) => {
    const value = column.key ? (row as any)[column.key] : '';
    
    if (column.render) {
      return column.render(value, row);
    }
    
    return value;
  };

  const getActionIcon = (action: ProviderTableAction<T>) => {
    if (action.icon) return action.icon;
    
    switch (action.label.toLowerCase()) {
      case 'view':
        return <Eye className="h-4 w-4" />;
      case 'edit':
        return <Edit className="h-4 w-4" />;
      case 'delete':
        return <Trash2 className="h-4 w-4" />;
      default:
        return <MoreHorizontal className="h-4 w-4" />;
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead
                key={String(column.key)}
                className={cn(
                  "font-medium text-muted-foreground",
                  column.align === 'center' && "text-center",
                  column.align === 'right' && "text-right"
                )}
                style={{ width: column.width }}
              >
                {column.label}
              </TableHead>
            ))}
            {actions.length > 0 && (
              <TableHead className="w-[100px] text-right">Actions</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              className={cn(
                "hover:bg-muted/50 transition-colors",
                onRowClick && "cursor-pointer"
              )}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((column) => (
                <TableCell
                  key={String(column.key)}
                  className={cn(
                    column.align === 'center' && "text-center",
                    column.align === 'right' && "text-right"
                  )}
                >
                  {renderCellValue(column, row)}
                </TableCell>
              ))}
              {actions.length > 0 && (
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    {actions
                      .filter(action => !action.condition || action.condition(row))
                      .map((action, actionIndex) => (
                        <Button
                          key={actionIndex}
                          variant={action.variant || "ghost"}
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            action.onClick(row);
                          }}
                          className="h-8 w-8 p-0"
                        >
                          {getActionIcon(action)}
                        </Button>
                      ))}
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
