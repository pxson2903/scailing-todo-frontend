import { FunctionComponent, useCallback, MouseEvent } from 'react';
import {
  Stack,
  Divider,
  Drawer,
  DrawerProps,
  FormControlLabel,
  Switch,
  Tooltip,
} from '@mui/material';
import { LinkToPage } from '@/utils';
import { useIsMobile } from '@/hooks';
import { SIDE_BAR_WIDTH, TOP_BAR_DESKTOP_HEIGHT } from '../config';
import SideBarNavList from './SideBarNavList';
import { useEventLogout, useIsAuthenticated } from '@/hooks/auth';
import UserInfo from '@/components/UserInfo';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { AppIconButton } from '@/components';

export interface SideBarProps
  extends Pick<
    DrawerProps,
    'anchor' | 'className' | 'open' | 'variant' | 'onClose'
  > {
  items: Array<LinkToPage>;
}

const SideBar: FunctionComponent<SideBarProps> = ({
  anchor,
  open,
  variant,
  items,
  onClose,
  ...restOfProps
}) => {
  const isAuthenticated = useIsAuthenticated();
  const onMobile = useIsMobile();
  const user = useSelector((state: RootState) => state.auth.user);
  const onLogout = useEventLogout();

  const handleAfterLinkClick = useCallback(
    (event: MouseEvent) => {
      if (variant === 'temporary' && typeof onClose === 'function') {
        onClose(event, 'backdropClick');
      }
    },
    [variant, onClose]
  );

  return (
    <Drawer
      anchor={anchor}
      open={open}
      variant={variant}
      PaperProps={{
        sx: {
          width: SIDE_BAR_WIDTH,
          marginTop: onMobile
            ? 0
            : variant === 'temporary'
              ? 0
              : TOP_BAR_DESKTOP_HEIGHT,
          height: onMobile
            ? '100%'
            : variant === 'temporary'
              ? '100%'
              : `calc(100% - ${TOP_BAR_DESKTOP_HEIGHT})`,
        },
      }}
      onClose={onClose}
    >
      <Stack
        sx={{
          height: '100%',
          padding: 2,
        }}
        {...restOfProps}
        onClick={handleAfterLinkClick}
      >
        {isAuthenticated && (
          <>
            <UserInfo user={user} />
            <Divider />
          </>
        )}

        <SideBarNavList items={items} showIcons={true} />
      </Stack>

      <Divider />

      <Stack
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          marginTop: 2,
        }}
      >
        {isAuthenticated && (
          <AppIconButton
            icon="logout"
            title="Logout Current User"
            onClick={onLogout}
          />
        )}
      </Stack>
    </Drawer>
  );
};

export default SideBar;
