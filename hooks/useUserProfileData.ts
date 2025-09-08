
// Re-export everything from the refactored hooks
export * from './profile/types';
export * from './profile/useProfileData';
export * from './profile/usePasswordManagement';
export * from './profile/useAvatarManagement';

// For backward compatibility
export { useProfileData as useUserProfileData } from './profile/useProfileData';
