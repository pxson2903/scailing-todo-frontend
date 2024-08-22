'use client';
import { useRouter } from 'next/navigation';
import React, { FunctionComponent, useEffect } from 'react';
import { useIsAuthenticated } from '@/hooks/auth';

type PropsType = {
  params?: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

function withPageRequiredAuth(Component: FunctionComponent<PropsType>) {
  return function WithPageRequiredAuth(props: PropsType) {
    const isAuthenticated = useIsAuthenticated();
    const router = useRouter();

    useEffect(() => {
      const check = () => {
        if (isAuthenticated) return;
        router.replace(`auth/login`);
      };

      check();
    }, [router, isAuthenticated]);

    return isAuthenticated ? <Component {...props} /> : null;
  };
}

export default withPageRequiredAuth;
