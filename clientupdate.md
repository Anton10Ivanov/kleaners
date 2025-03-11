
# Client Terminology Migration Plan

## Overview
This document outlines the comprehensive plan to rename all instances of "customer" and "user" to "client" throughout the application. This change will affect database tables, component names, file names, variable names, and comments across the codebase.

## Goals
- Ensure consistent terminology throughout the application
- Minimize the risk of errors during transition
- Maintain all existing functionality
- Update database schema and related configurations
- Implement changes in a systematic, phased approach

## Implementation Strategy

### Phase 1: Database Schema Migration ✅
1. **Create database migration scripts** ✅
   - Rename the `customers` table to `clients` ✅
   - Update all foreign keys and references ✅
   - Modify column names containing "customer" to use "client" ✅
   - Update any stored procedures, functions, or triggers ✅

2. **Data preservation** ✅
   - Ensure all existing data is preserved during migration ✅
   - Create backup before executing migration ✅
   - Verify data integrity after migration ✅

### Phase 2: Backend Code Updates ✅
1. **Update API endpoints and services** ✅
   - Rename all endpoints containing "customer" to "client" ✅
   - Update service functions and method names ✅
   - Modify request/response type definitions ✅

2. **Update TypeScript types and interfaces** ✅
   - Rename interfaces (e.g., `Customer` → `Client`) ✅
   - Update type imports across the codebase ✅
   - Modify Supabase type definitions ✅

### Phase 3: Frontend Component Updates ✅
1. **Rename component files** ✅
   - Rename files following the pattern `*Customer*.tsx` to `*Client*.tsx` ✅
   - Update imports in all files that reference these components ✅
   - Update component names inside files ✅

2. **Update hooks and utilities** ✅
   - Rename custom hooks (e.g., `useCustomers` → `useClients`) ✅
   - Modify utility functions that reference customers ✅
   - Update contexts if applicable ✅

3. **Update UI text and labels** ✅
   - Replace all UI text instances of "customer" with "client" ✅
   - Update aria-labels and other accessibility attributes ✅
   - Review and update placeholder text in forms ✅

### Phase 4: Legacy Data Handling ✅
1. **Handle references to old customer terminology** ✅
   - Update mock data structures that contain "customer" references ✅
   - Create compatibility layer for any external integrations if needed ✅
   - Document any legacy references that must be maintained ✅

2. **Audit remaining references** ✅
   - Perform a comprehensive search for any remaining "customer" references ✅
   - Update documentation and comments ✅
   - Review error messages and notifications ✅

### Phase 5: Testing and Validation ⏳
1. **Comprehensive testing** ⏳
   - Test all affected components and functionality
   - Verify data flow from database to UI
   - Check all CRUD operations with client data

2. **Performance validation** ⏳
   - Ensure the application performance is not affected
   - Verify that all real-time updates still function correctly

## Detailed Changes

### Files Renamed ✅
- `src/components/admin/sections/CustomersSection.tsx` → `src/components/admin/sections/ClientsSection.tsx` ✅
- `src/components/admin/sections/customers/` → `src/components/admin/sections/clients/` ✅
- `src/hooks/useCustomers.ts` → `src/hooks/useClients.ts` ✅
- `src/utils/mock/customers.ts` → `src/utils/mock/clients.ts` ✅

### Database Tables Updated ✅
- `customers` → `clients` ✅
- Updated related foreign keys and references ✅

### Components Renamed ✅
- `CustomersSection` → `ClientsSection` ✅
- `CustomerForm` → `ClientForm` ✅
- `CustomersTable` → `ClientsTable` ✅
- `CustomerQuestionsSection` → `ClientQuestionsSection` ✅

### Types Updated ✅
- `MockCustomer` → `MockClient` ✅ 
- `CustomerQuestion` → `ClientQuestion` ✅

### Mock Data Updated ✅
- Updated all mock data files to use client terminology ✅
- Fixed references in bookings, dashboard and other files ✅

## Risk Mitigation
1. **Incremental changes** ✅
   - Implement changes in small, testable increments ✅
   - Validate each change before proceeding to the next ✅

2. **Comprehensive testing** ⏳
   - Unit tests for all modified components ⏳
   - Integration tests for data flow ⏳
   - End-to-end tests for key user journeys ⏳

3. **Fallback strategy** ✅
   - Maintain backup snapshots at each phase ✅
   - Document rollback procedures ✅

## Timeline
- Phase 1: Database Migration (1-2 days) ✅
- Phase 2: Backend Code Updates (2-3 days) ✅
- Phase 3: Frontend Component Updates (3-4 days) ✅
- Phase 4: Legacy Data Handling (1-2 days) ✅
- Phase 5: Testing and Validation (2-3 days) ⏳

## Success Criteria
- All instances of "customer" and "user" are replaced with "client" ✅
- All functionality works exactly as before ⏳
- No regression in user experience ⏳
- Consistent terminology across the application ✅

## Next Steps
1. Complete comprehensive testing of all modified components
2. Verify data flow from database to UI works correctly
3. Check all CRUD operations with client data
4. Ensure performance is not affected by the changes
5. Document any remaining edge cases or technical debt
