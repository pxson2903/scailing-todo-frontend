'use client';

import React, { FunctionComponent, PropsWithChildren } from 'react';
import PublicLayout from './PublicLayout';
import { useIsAuthenticated } from '@/hooks/auth';
import PrivateLayout from './PrivateLayout';

const CurrentLayout: FunctionComponent<PropsWithChildren> = (props) => {
  return useIsAuthenticated() ? (
    <PrivateLayout {...props} />
  ) : (
    <PublicLayout {...props} />
  );
};

export default CurrentLayout;
