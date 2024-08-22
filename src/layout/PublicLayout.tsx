import { FunctionComponent, PropsWithChildren } from 'react';
import { IS_DEBUG } from '@/config';
import { LinkToPage } from '@/utils';
import TopBarAndSideBarLayout from './TopBarAndSideBarLayout';

const TITLE_PUBLIC = 'Unauthorized';

const SIDE_BAR_ITEMS: Array<LinkToPage> = [
  {
    title: 'Log In',
    path: '/auth/login',
    icon: 'login',
  },
  {
    title: 'Sign Up',
    path: '/auth/signup',
    icon: 'signup',
  },
  {
    title: 'About',
    path: '/about',
    icon: 'info',
  },
];

IS_DEBUG &&
  SIDE_BAR_ITEMS.push({
    title: '[Debug Tools]',
    path: '/dev',
    icon: 'settings',
  });

const PublicLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const title = TITLE_PUBLIC;

  return (
    <TopBarAndSideBarLayout
      sidebarItems={SIDE_BAR_ITEMS}
      title={title}
      variant="sidebarAlwaysTemporary"
    >
      {children}
    </TopBarAndSideBarLayout>
  );
};

export default PublicLayout;
