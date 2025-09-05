import { useState, useEffect, useRef, useMemo, useCallback, memo } from 'react';
import { cn } from '@/lib/utils';

interface VirtualListProps<T> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  overscan?: number;
  className?: string;
  onScroll?: (scrollTop: number) => void;
  getItemKey?: (item: T, index: number) => string | number;
}

/**
 * High-performance virtual scrolling component
 * Only renders visible items + overscan buffer for optimal performance
 */
export const VirtualList = memo(function VirtualList<T>({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  overscan = 5,
  className,
  onScroll,
  getItemKey = (_, index) => index,
}: VirtualListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate visible range
  const visibleRange = useMemo(() => {
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / itemHeight),
      items.length - 1
    );

    return {
      start: Math.max(0, startIndex - overscan),
      end: Math.min(items.length - 1, endIndex + overscan),
    };
  }, [scrollTop, itemHeight, containerHeight, items.length, overscan]);

  // Get visible items
  const visibleItems = useMemo(() => {
    return items.slice(visibleRange.start, visibleRange.end + 1);
  }, [items, visibleRange.start, visibleRange.end]);

  // Handle scroll
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const newScrollTop = e.currentTarget.scrollTop;
    setScrollTop(newScrollTop);
    onScroll?.(newScrollTop);
  }, [onScroll]);

  // Total height and offset calculations
  const totalHeight = items.length * itemHeight;
  const offsetY = visibleRange.start * itemHeight;

  return (
    <div
      ref={containerRef}
      className={cn('overflow-auto', className)}
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div
          style={{
            transform: `translateY(${offsetY}px)`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          }}
        >
          {visibleItems.map((item, index) => {
            const actualIndex = visibleRange.start + index;
            return (
              <div
                key={getItemKey(item, actualIndex)}
                style={{ height: itemHeight }}
              >
                {renderItem(item, actualIndex)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

// Hook for managing virtual list state
export function useVirtualList<T>(
  items: T[],
  itemHeight: number,
  containerHeight: number
) {
  const [scrollTop, setScrollTop] = useState(0);

  const visibleRange = useMemo(() => {
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / itemHeight),
      items.length - 1
    );

    return { start: startIndex, end: endIndex };
  }, [scrollTop, itemHeight, containerHeight, items.length]);

  const scrollToIndex = useCallback((index: number) => {
    const newScrollTop = index * itemHeight;
    setScrollTop(newScrollTop);
  }, [itemHeight]);

  const scrollToTop = useCallback(() => {
    setScrollTop(0);
  }, []);

  return {
    scrollTop,
    setScrollTop,
    visibleRange,
    scrollToIndex,
    scrollToTop,
  };
}

// Grid virtual scrolling for 2D layouts
interface VirtualGridProps<T> {
  items: T[];
  itemWidth: number;
  itemHeight: number;
  containerWidth: number;
  containerHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  gap?: number;
  className?: string;
}

export const VirtualGrid = memo(function VirtualGrid<T>({
  items,
  itemWidth,
  itemHeight,
  containerWidth,
  containerHeight,
  renderItem,
  gap = 0,
  className,
}: VirtualGridProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);

  const columnsPerRow = Math.floor(containerWidth / (itemWidth + gap));
  const totalRows = Math.ceil(items.length / columnsPerRow);
  const rowHeight = itemHeight + gap;

  const visibleRange = useMemo(() => {
    const startRow = Math.floor(scrollTop / rowHeight);
    const endRow = Math.min(
      startRow + Math.ceil(containerHeight / rowHeight),
      totalRows - 1
    );

    return {
      startRow: Math.max(0, startRow - 2), // 2 row overscan
      endRow: Math.min(totalRows - 1, endRow + 2),
    };
  }, [scrollTop, rowHeight, containerHeight, totalRows]);

  const visibleItems = useMemo(() => {
    const startIndex = visibleRange.startRow * columnsPerRow;
    const endIndex = Math.min(
      (visibleRange.endRow + 1) * columnsPerRow - 1,
      items.length - 1
    );
    return items.slice(startIndex, endIndex + 1);
  }, [items, visibleRange.startRow, visibleRange.endRow, columnsPerRow]);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  const totalHeight = totalRows * rowHeight;
  const offsetY = visibleRange.startRow * rowHeight;

  return (
    <div
      className={cn('overflow-auto', className)}
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div
          style={{
            transform: `translateY(${offsetY}px)`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            display: 'grid',
            gridTemplateColumns: `repeat(${columnsPerRow}, ${itemWidth}px)`,
            gap: `${gap}px`,
          }}
        >
          {visibleItems.map((item, index) => {
            const actualIndex = visibleRange.startRow * columnsPerRow + index;
            return (
              <div key={actualIndex}>
                {renderItem(item, actualIndex)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});
