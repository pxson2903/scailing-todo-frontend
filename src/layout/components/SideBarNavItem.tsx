'use client';
import { FunctionComponent, MouseEventHandler } from 'react';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { AppIcon, AppLink } from '@/components';
import { LinkToPage } from '@/utils';
import { usePathname } from 'next/navigation';

interface Props extends LinkToPage {
  openInNewTab?: boolean;
  selected?: boolean;
  onClick?: MouseEventHandler;
}

const SideBarNavItem: FunctionComponent<Props> = ({
  openInNewTab,
  icon,
  path,
  selected: propSelected = false,
  subtitle,
  title,
  onClick,
}) => {
  const pathname = usePathname();
  const selected =
    propSelected ||
    (path && path.length > 1 && pathname.startsWith(path)) ||
    false;

  return (
    <ListItemButton
      component={AppLink}
      selected={selected}
      to={path}
      href=""
      openInNewTab={openInNewTab}
      onClick={onClick}
    >
      <ListItemIcon>{icon && <AppIcon icon={icon} />}</ListItemIcon>
      <ListItemText primary={title} secondary={subtitle} />
    </ListItemButton>
  );
};

export default SideBarNavItem;
