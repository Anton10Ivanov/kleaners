
import type { ComponentType, ReactNode } from 'react';

/**
 * Type for component with children
 */
export type WithChildren<P = {}> = P & {
  children?: ReactNode;
};

/**
 * Type for component with required children
 */
export type WithRequiredChildren<P = {}> = P & {
  children: ReactNode;
};

/**
 * Type for component with class name
 */
export type WithClassName<P = {}> = P & {
  className?: string;
};

/**
 * Type for component with id
 */
export type WithId<P = {}> = P & {
  id?: string;
};

/**
 * Type for component with all common props
 */
export type WithCommonProps<P = {}> = WithChildren<WithClassName<WithId<P>>>;

/**
 * Type for component with as prop for polymorphic components
 */
export type PolymorphicComponentProps<
  Component extends React.ElementType,
  Props = {}
> = Props & {
  as?: Component;
} & Omit<React.ComponentPropsWithoutRef<Component>, 'as' | keyof Props>;

/**
 * Type for component with ref
 */
export type WithRef<T, P = {}> = P & {
  ref?: React.Ref<T>;
};

/**
 * Type for function with generic parameters and return type
 */
export type GenericFunction<Args extends any[], Return> = (...args: Args) => Return;

/**
 * Type for async function with generic parameters and return type
 */
export type AsyncFunction<Args extends any[], Return> = 
  (...args: Args) => Promise<Return>;

/**
 * Type for component loader (for dynamic imports)
 */
export type ComponentLoader<P = {}> = () => Promise<{ default: ComponentType<P> }>;

/**
 * Type for generic record with specific value type
 */
export type TypedRecord<K extends string | number | symbol, V> = Record<K, V>;

/**
 * Type for nullable value
 */
export type Nullable<T> = T | null;

/**
 * Type for optional value
 */
export type Optional<T> = T | undefined;

/**
 * Type for nullable or optional value
 */
export type Maybe<T> = T | null | undefined;

/**
 * Type for readonly array
 */
export type ReadonlyArray<T> = readonly T[];

/**
 * Type for function parameters
 */
export type Parameters<T extends (...args: any[]) => any> = T extends (...args: infer P) => any ? P : never;

/**
 * Type for function return type
 */
export type ReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : never;

/**
 * Type for required properties
 */
export type RequiredProperties<T, K extends keyof T> = T & {
  [P in K]-?: T[P];
};

/**
 * Type for optional properties
 */
export type OptionalProperties<T, K extends keyof T> = Omit<T, K> & {
  [P in K]?: T[P];
};

/**
 * Type for pick properties from T that are assignable to U
 */
export type PickByType<T, U> = {
  [P in keyof T as T[P] extends U ? P : never]: T[P];
};
