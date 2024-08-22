import { useCallback } from 'react';
import { RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { unsetAuth } from '@/redux/slices/authSlice';

export function useIsAuthenticated() {
  const token = useSelector((state: RootState) => state.auth.token);
  return !!token;
}

export function useEventLogout() {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(unsetAuth());
  }, [dispatch]);
}
