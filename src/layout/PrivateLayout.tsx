import { FunctionComponent, PropsWithChildren } from 'react';
import { IS_DEBUG } from '@/config';
import { LinkToPage } from '@/utils';
import TopBarAndSideBarLayout from './TopBarAndSideBarLayout';

const TITLE_PRIVATE = 'Task Management';

const SIDE_BAR_ITEMS: Array<LinkToPage> = [
  {
    title: 'Tasks',
    path: '/',
    icon: 'task',
  },
];

IS_DEBUG &&
  SIDE_BAR_ITEMS.push({
    title: '[Debug Tools]',
    path: '/dev',
    icon: 'settings',
  });

const PrivateLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const title = TITLE_PRIVATE;
  document.title = title;

  return (
    <TopBarAndSideBarLayout
      sidebarItems={SIDE_BAR_ITEMS}
      title={title}
      variant="sidebarPersistentOnDesktop"
    >
      {children}
    </TopBarAndSideBarLayout>
  );
};

export default PrivateLayout;
