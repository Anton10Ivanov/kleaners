
import { useEffect, useRef } from 'react';

/**
 * Hook that fires an effect only when dependencies change, not on initial mount
 * Similar to useEffect, but skips the first render
 */
export function useUpdateEffect(effect: React.EffectCallback, dependencies: React.DependencyList = []) {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    return effect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}
