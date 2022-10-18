import { useContext } from 'react';

import { MapProviderShape, SimpleMapContext } from './SimpleMapProvider';

export function useSimpleMapContext(): MapProviderShape {
  const context = useContext(SimpleMapContext);

  if (context === undefined) {
    throw new Error(
      'SimpleMapContext must be used within a SimpleMap Provider',
    );
  }
  return context;
}
