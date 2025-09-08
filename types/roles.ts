// User role types 
export enum UserRole {
  ADMIN = 'admin',
  PROVIDER = 'provider',
  CLIENT = 'client',
  SUPER_ADMIN = 'super_admin'
}

// Helper function to check if a role is admin
export function isAdminRole(role: UserRole): boolean {
  return role === UserRole.ADMIN || role === UserRole.SUPER_ADMIN;
}

// Helper function to check if a role is provider
export function isProviderRole(role: UserRole): boolean {
  return role === UserRole.PROVIDER;
}

// Helper function to check if a role is client
export function isClientRole(role: UserRole): boolean {
  return role === UserRole.CLIENT;
}

// Helper function to get role display name
export function getRoleDisplayName(role: UserRole): string {
  switch (role) {
    case UserRole.ADMIN:
      return 'Administrator';
    case UserRole.SUPER_ADMIN:
      return 'Super Administrator';
    case UserRole.PROVIDER:
      return 'Service Provider';
    case UserRole.CLIENT:
      return 'Client';
    default:
      return 'Unknown';
  }
}

// Helper function to get role description
export function getRoleDescription(role: UserRole): string {
  switch (role) {
    case UserRole.ADMIN:
      return 'Can manage users, bookings, and system settings';
    case UserRole.SUPER_ADMIN:
      return 'Full system access including admin management';
    case UserRole.PROVIDER:
      return 'Can manage bookings, availability, and client interactions';
    case UserRole.CLIENT:
      return 'Can book services and manage their account';
    default:
      return 'Unknown role';
  }
}
