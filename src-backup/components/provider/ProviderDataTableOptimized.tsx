import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProviderTableCore, ProviderTableColumn, ProviderTableAction } from './ProviderTableCore';
import { ProviderTableControls, ProviderTablePagination } from './ProviderTableControls';
import { cn } from '@/lib/utils';

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

export function ProviderDataTableOptimized<T = any>({
  data,
  columns,
  actions = [],
  searchable = true,
  filterable = true,
  sortable = true,
  pagination = true,
  pageSize: initialPageSize = 10,
  title,
  description,
  loading = false,
  emptyMessage = "No data available",
  onRowClick,
  className,
  type = 'bookings'
}: ProviderDataTableProps<T>) {
  const [searchValue, setSearchValue] = useState('');
  const [filterValue, setFilterValue] = useState('all');
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  // Filter options based on type
  const filterOptions = useMemo(() => {
    switch (type) {
      case 'bookings':
        return [
          { value: 'all', label: 'All Bookings' },
          { value: 'upcoming', label: 'Upcoming' },
          { value: 'pending', label: 'Pending' },
          { value: 'completed', label: 'Completed' },
          { value: 'cancelled', label: 'Cancelled' }
        ];
      case 'availability':
        return [
          { value: 'all', label: 'All Time' },
          { value: 'available', label: 'Available' },
          { value: 'busy', label: 'Busy' },
          { value: 'unavailable', label: 'Unavailable' }
        ];
      case 'earnings':
        return [
          { value: 'all', label: 'All Time' },
          { value: 'thisMonth', label: 'This Month' },
          { value: 'lastMonth', label: 'Last Month' },
          { value: 'thisYear', label: 'This Year' }
        ];
      case 'customers':
        return [
          { value: 'all', label: 'All Customers' },
          { value: 'active', label: 'Active' },
          { value: 'inactive', label: 'Inactive' },
          { value: 'new', label: 'New' }
        ];
      default:
        return [{ value: 'all', label: 'All' }];
    }
  }, [type]);

  // Filter and search data
  const filteredData = useMemo(() => {
    let filtered = data;

    // Apply search filter
    if (searchValue) {
      filtered = filtered.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    }

    // Apply type-specific filters
    if (filterValue !== 'all') {
      filtered = filtered.filter((row) => {
        switch (type) {
          case 'bookings':
            return (row as any).status === filterValue;
          case 'availability':
            return (row as any).status === filterValue;
          case 'earnings':
            return (row as any).period === filterValue;
          case 'customers':
            return (row as any).status === filterValue;
          default:
            return true;
        }
      });
    }

    return filtered;
  }, [data, searchValue, filterValue, type]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortField) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = (a as any)[sortField];
      const bValue = (b as any)[sortField];
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortField, sortDirection]);

  // Paginate data
  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;
    
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage, pageSize, pagination]);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const handleSort = (field: string) => {
    if (!sortable) return;
    
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleExport = () => {
    // Simple CSV export
    const csvContent = [
      columns.map(col => col.label).join(','),
      ...paginatedData.map(row =>
        columns.map(col => {
          const value = (row as any)[col.key];
          return typeof value === 'string' ? `"${value}"` : value;
        }).join(',')
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}-data.csv`;
    a.click();
    URL.revokeObjectURL(url);
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
          {title && <CardTitle>{title}</CardTitle>}
          {description && <p className="text-muted-foreground">{description}</p>}
        </CardHeader>
      )}
      <CardContent>
        <ProviderTableControls
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          filterValue={filterValue}
          onFilterChange={setFilterValue}
          filterOptions={filterOptions}
          searchable={searchable}
          filterable={filterable}
          onExport={handleExport}
        />

        {paginatedData.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            {emptyMessage}
          </div>
        ) : (
          <>
            <ProviderTableCore
              data={paginatedData}
              columns={columns}
              actions={actions}
              onRowClick={onRowClick}
            />
            
            {pagination && totalPages > 1 && (
              <ProviderTablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                pageSize={pageSize}
                totalItems={filteredData.length}
                onPageSizeChange={(newSize) => {
                  setPageSize(newSize);
                  setCurrentPage(1);
                }}
              />
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
