import React, { useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Filter, Download, MoreHorizontal, Edit, Trash2, Eye, Calendar, Clock, MapPin } from 'lucide-react';
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

export interface ProviderDataTableProps<T = any> {
  data: T[];
  columns: ProviderTableColumn<T>[];
  actions?: ProviderTableAction<T>[];
  searchable?: boolean;
  filterable?: boolean;
  sortable?: boolean;
  pagination?: boolean;
  pageSize?: number;
  title?: string;
  description?: string;
  loading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
  className?: string;
  type?: 'bookings' | 'availability' | 'earnings' | 'customers';
}

export function ProviderDataTable<T = any>({
  data,
  columns,
  actions = [],
  searchable = true,
  filterable = true,
  sortable = true,
  pagination = true,
  pageSize = 10,
  title,
  description,
  loading = false,
  emptyMessage = 'No data available',
  onRowClick,
  className,
  type = 'customers'
}: ProviderDataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [statusFilter, setStatusFilter] = useState('all');

  // Filter and search data
  const filteredData = useMemo(() => {
    let filtered = data;

    // Apply search
    if (searchTerm && searchable) {
      filtered = filtered.filter(row =>
        columns.some(column => {
          const value = getNestedValue(row, column.key);
          return String(value).toLowerCase().includes(searchTerm.toLowerCase());
        })
      );
    }

    // Apply status filter
    if (statusFilter !== 'all' && filterable) {
      filtered = filtered.filter(row => {
        const status = getNestedValue(row, 'status');
        return status === statusFilter;
      });
    }

    // Apply sorting
    if (sortField && sortable) {
      filtered = [...filtered].sort((a, b) => {
        const aValue = getNestedValue(a, sortField);
        const bValue = getNestedValue(b, sortField);
        
        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [data, searchTerm, sortField, sortDirection, statusFilter, columns, searchable, sortable, filterable]);

  // Paginate data
  const paginatedData = useMemo(() => {
    if (!pagination) return filteredData;
    
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage, pageSize, pagination]);

  // Get nested value from object
  const getNestedValue = (obj: any, path: string) => {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  };

  // Handle sort
  const handleSort = (field: string) => {
    if (!sortable) return;
    
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Handle row selection
  const handleRowSelect = (rowId: string) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(rowId)) {
      newSelected.delete(rowId);
    } else {
      newSelected.add(rowId);
    }
    setSelectedRows(newSelected);
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedRows.size === paginatedData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(paginatedData.map((_, index) => index.toString())));
    }
  };

  // Get row ID (assuming each row has an 'id' field)
  const getRowId = (row: T, index: number) => {
    return (row as any).id || index.toString();
  };

  // Calculate pagination info
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  // Get status filter options based on type
  const getStatusOptions = () => {
    switch (type) {
      case 'bookings':
        return [
          { value: 'all', label: 'All Bookings' },
          { value: 'pending', label: 'Pending' },
          { value: 'confirmed', label: 'Confirmed' },
          { value: 'in-progress', label: 'In Progress' },
          { value: 'completed', label: 'Completed' },
          { value: 'cancelled', label: 'Cancelled' }
        ];
      case 'availability':
        return [
          { value: 'all', label: 'All Times' },
          { value: 'available', label: 'Available' },
          { value: 'busy', label: 'Busy' },
          { value: 'unavailable', label: 'Unavailable' }
        ];
      case 'earnings':
        return [
          { value: 'all', label: 'All Earnings' },
          { value: 'pending', label: 'Pending' },
          { value: 'paid', label: 'Paid' },
          { value: 'refunded', label: 'Refunded' }
        ];
      default:
        return [
          { value: 'all', label: 'All' },
          { value: 'active', label: 'Active' },
          { value: 'inactive', label: 'Inactive' }
        ];
    }
  };

  if (loading) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      {(title || description) && (
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {type === 'bookings' && <Calendar className="h-5 w-5" />}
            {type === 'availability' && <Clock className="h-5 w-5" />}
            {type === 'earnings' && <Download className="h-5 w-5" />}
            {title}
          </CardTitle>
          {description && <p className="text-muted-foreground">{description}</p>}
        </CardHeader>
      )}
      
      <CardContent className="p-0">
        {/* Search and Filters */}
        {(searchable || filterable) && (
          <div className="p-6 border-b">
            <div className="flex flex-col sm:flex-row gap-4">
              {searchable && (
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              )}
              
              {filterable && (
                <div className="flex gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                      {getStatusOptions().map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    More Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {actions.length > 0 && (
                  <TableHead className="w-12">
                    <input
                      type="checkbox"
                      checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                      onChange={handleSelectAll}
                      className="rounded"
                    />
                  </TableHead>
                )}
                
                {columns.map((column) => (
                  <TableHead
                    key={String(column.key)}
                    className={cn(
                      column.sortable && sortable && 'cursor-pointer hover:bg-muted/50',
                      column.align === 'center' && 'text-center',
                      column.align === 'right' && 'text-right'
                    )}
                    style={{ width: column.width }}
                    onClick={() => column.sortable && handleSort(String(column.key))}
                  >
                    <div className="flex items-center gap-2">
                      {column.label}
                      {column.sortable && sortable && sortField === column.key && (
                        <span className="text-xs">
                          {sortDirection === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </TableHead>
                ))}
                
                {actions.length > 0 && (
                  <TableHead className="w-12">Actions</TableHead>
                )}
              </TableRow>
            </TableHeader>
            
            <TableBody>
              {paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length + (actions.length > 0 ? 2 : 0)} className="text-center py-8">
                    <div className="text-muted-foreground">
                      {emptyMessage}
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((row, index) => {
                  const rowId = getRowId(row, index);
                  const isSelected = selectedRows.has(rowId);
                  
                  return (
                    <TableRow
                      key={rowId}
                      className={cn(
                        isSelected && 'bg-muted/50',
                        onRowClick && 'cursor-pointer hover:bg-muted/50'
                      )}
                      onClick={() => onRowClick?.(row)}
                    >
                      {actions.length > 0 && (
                        <TableCell>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleRowSelect(rowId)}
                            className="rounded"
                          />
                        </TableCell>
                      )}
                      
                      {columns.map((column) => {
                        const value = getNestedValue(row, String(column.key));
                        const renderedValue = column.render ? column.render(value, row) : value;
                        
                        return (
                          <TableCell
                            key={String(column.key)}
                            className={cn(
                              column.align === 'center' && 'text-center',
                              column.align === 'right' && 'text-right'
                            )}
                          >
                            {renderedValue}
                          </TableCell>
                        );
                      })}
                      
                      {actions.length > 0 && (
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {actions.map((action, actionIndex) => {
                              if (action.condition && !action.condition(row)) return null;
                              
                              return (
                                <Button
                                  key={actionIndex}
                                  variant={action.variant || 'ghost'}
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    action.onClick(row);
                                  }}
                                >
                                  {action.icon || action.label}
                                </Button>
                              );
                            })}
                          </div>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {pagination && totalPages > 1 && (
          <div className="p-6 border-t">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, filteredData.length)} of {filteredData.length} entries
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={!hasPrevPage}
                >
                  Previous
                </Button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page = i + 1;
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </Button>
                    );
                  })}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={!hasNextPage}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default ProviderDataTable;
