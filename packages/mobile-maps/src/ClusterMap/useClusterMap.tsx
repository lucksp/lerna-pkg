import { useContext } from 'react';

import {
  ClusterMapContext,
  ClusterMapProviderShape,
} from './ClusterMapProvider';

export function useClusterMapContext(): ClusterMapProviderShape {
  const context = useContext(ClusterMapContext);

  if (context === undefined) {
    throw new Error(
      'ClusterMapContext must be used within a ClusterMap Provider',
    );
  }
  return context;
}
