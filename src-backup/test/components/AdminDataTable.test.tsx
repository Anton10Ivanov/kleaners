import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '../utils/test-utils';
import AdminDataTable from '@/components/admin/AdminDataTable';
import { createMockUser, createMockBooking } from '../utils/test-utils';

describe('AdminDataTable', () => {
  const mockUsers = [
    createMockUser({ id: '1', name: 'John Doe', email: 'john@example.com' }),
    createMockUser({ id: '2', name: 'Jane Smith', email: 'jane@example.com' }),
  ];

  const mockColumns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
  ];

  const mockActions = [
    {
      label: 'Edit',
      onClick: vi.fn(),
    },
    {
      label: 'Delete',
      onClick: vi.fn(),
      variant: 'destructive' as const,
    },
  ];

  it('renders table with data', () => {
    render(
      <AdminDataTable
        data={mockUsers}
        columns={mockColumns}
        title="Users"
        description="Manage user accounts"
      />
    );

    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('Manage user accounts')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
  });

  it('renders empty state when no data', () => {
    render(
      <AdminDataTable
        data={[]}
        columns={mockColumns}
        emptyMessage="No users found"
      />
    );

    expect(screen.getByText('No users found')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(
      <AdminDataTable
        data={[]}
        columns={mockColumns}
        loading={true}
      />
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('handles search functionality', async () => {
    render(
      <AdminDataTable
        data={mockUsers}
        columns={mockColumns}
        searchable={true}
      />
    );

    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'John' } });

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
    });
  });

  it('handles sorting', async () => {
    render(
      <AdminDataTable
        data={mockUsers}
        columns={mockColumns}
        sortable={true}
      />
    );

    const nameHeader = screen.getByText('Name');
    fireEvent.click(nameHeader);

    await waitFor(() => {
      expect(screen.getByText('↑')).toBeInTheDocument();
    });
  });

  it('handles row selection', async () => {
    render(
      <AdminDataTable
        data={mockUsers}
        columns={mockColumns}
        actions={mockActions}
      />
    );

    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[1]); // Select first row

    await waitFor(() => {
      expect(checkboxes[1]).toBeChecked();
    });
  });

  it('handles action clicks', async () => {
    render(
      <AdminDataTable
        data={mockUsers}
        columns={mockColumns}
        actions={mockActions}
      />
    );

    const editButton = screen.getAllByText('Edit')[0];
    fireEvent.click(editButton);

    expect(mockActions[0].onClick).toHaveBeenCalledWith(mockUsers[0]);
  });

  it('handles pagination', async () => {
    const manyUsers = Array.from({ length: 25 }, (_, i) =>
      createMockUser({ id: i.toString(), name: `User ${i}` })
    );

    render(
      <AdminDataTable
        data={manyUsers}
        columns={mockColumns}
        pagination={true}
        pageSize={10}
      />
    );

    expect(screen.getByText('Showing 1 to 10 of 25 entries')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('handles row click', async () => {
    const onRowClick = vi.fn();
    
    render(
      <AdminDataTable
        data={mockUsers}
        columns={mockColumns}
        onRowClick={onRowClick}
      />
    );

    const firstRow = screen.getByText('John Doe').closest('tr');
    fireEvent.click(firstRow!);

    expect(onRowClick).toHaveBeenCalledWith(mockUsers[0]);
  });
});
