
/**
 * Common types shared across the application
 */

/**
 * Status result type for operations that may succeed or fail
 */
export type OperationResult<T = void> = {
  success: boolean;
  data?: T;
  error?: string;
  code?: string;
};

/**
 * Generic pagination parameters
 */
export type PaginationParams = {
  page: number;
  limit: number;
};

/**
 * Generic paginated response
 */
export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

/**
 * Generic sort parameters
 */
export type SortParams<T> = {
  field: keyof T;
  direction: 'asc' | 'desc';
};

/**
 * Generic filter operator
 */
export type FilterOperator = 
  | 'eq'    // equals
  | 'neq'   // not equals
  | 'gt'    // greater than
  | 'gte'   // greater than or equal
  | 'lt'    // less than
  | 'lte'   // less than or equal
  | 'in'    // in array
  | 'like'; // pattern match

/**
 * Generic filter parameter
 */
export type FilterParam<T> = {
  field: keyof T;
  operator: FilterOperator;
  value: unknown;
};

/**
 * Generic type for API query parameters
 */
export type QueryParams<T> = {
  pagination?: PaginationParams;
  sort?: SortParams<T>;
  filters?: FilterParam<T>[];
};
