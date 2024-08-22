'use client';
import { useEffect, useState } from 'react';
import useWindowsSize from './useWindowSize';
import { useMediaQuery, useTheme } from '@mui/material';
import { IS_SERVER } from '@/utils';

export const MOBILE_SCREEN_MAX_WIDTH = 600;
export const SERVER_SIDE_MOBILE_FIRST = true;

export function useIsMobileByWindowsResizing() {
  const theme = useTheme();
  const { width } = useWindowsSize();
  const onMobile =
    width <= theme.breakpoints?.values?.sm ?? MOBILE_SCREEN_MAX_WIDTH;
  return onMobile;
}

function useIsMobileByMediaQuery() {
  const theme = useTheme();
  const onMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return onMobile;
}

function useIsMobileForNextJs() {
  // const onMobile = useOnMobileByWindowsResizing();
  const onMobile = useIsMobileByMediaQuery();
  const [onMobileDelayed, setOnMobileDelayed] = useState(
    SERVER_SIDE_MOBILE_FIRST
  );

  useEffect(() => {
    setOnMobileDelayed(onMobile); // Next.js don't allow to use useOnMobileXxx() directly, so we need to use this workaround
  }, [onMobile]);

  return onMobileDelayed;
}

function useMobileOrDesktopByChangingBodyClass() {
  const onMobile = useIsMobileByMediaQuery();

  useEffect(() => {
    if (onMobile) {
      document.body.classList.remove('onDesktop');
      document.body.classList.add('onMobile');
    } else {
      document.body.classList.remove('onMobile');
      document.body.classList.add('onDesktop');
    }
  }, [onMobile]);
}


export const useIsMobile = IS_SERVER
  ? () => SERVER_SIDE_MOBILE_FIRST
  : useIsMobileForNextJs;
export const useBodyClassForMobileOrDesktop = IS_SERVER
  ? () => undefined
  : useMobileOrDesktopByChangingBodyClass;
