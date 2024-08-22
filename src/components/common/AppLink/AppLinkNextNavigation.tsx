'use client';
// See: https://github.com/mui-org/material-ui/blob/6b18675c7e6204b77f4c469e113f62ee8be39178/examples/nextjs-with-typescript/src/Link.tsx
/* eslint-disable jsx-a11y/anchor-has-content */
import { AnchorHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link';
import { APP_LINK_COLOR, APP_LINK_UNDERLINE } from '../../config';

export const EXTERNAL_LINK_PROPS = {
  target: '_blank',
  rel: 'noopener noreferrer',
};

interface NextLinkComposedProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
    Omit<NextLinkProps, 'href' | 'as' | 'onClick' | 'onMouseEnter'> {
  to: NextLinkProps['href'];
  linkAs?: NextLinkProps['as'];
  href?: NextLinkProps['href'];
}

const NextLinkComposed = forwardRef<HTMLAnchorElement, NextLinkComposedProps>(
  function NextLinkComposed(
    {
      to,
      linkAs,
      href,
      replace,
      scroll,
      passHref,
      shallow,
      prefetch,
      ...restOfProps
    },
    ref
  ) {
    return (
      <NextLink
        legacyBehavior={true}
        href={to}
        prefetch={prefetch}
        as={linkAs}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        passHref={passHref}
      >
        <a ref={ref} {...restOfProps} />
      </NextLink>
    );
  }
);

export type AppLinkForNextProps = {
  activeClassName?: string;
  as?: NextLinkProps['as'];
  href?: string | NextLinkProps['href'];
  noLinkStyle?: boolean;
  to?: string | NextLinkProps['href'];
  openInNewTab?: boolean;
} & Omit<NextLinkComposedProps, 'to' | 'linkAs' | 'href'> &
  Omit<MuiLinkProps, 'href'>;

const AppLinkForNext = forwardRef<HTMLAnchorElement, AppLinkForNextProps>(
  function Link(props, ref) {
    const {
      activeClassName = 'active',
      as: linkAs,
      className: classNameProps,
      href,
      noLinkStyle,
      role,
      color = APP_LINK_COLOR,
      underline = APP_LINK_UNDERLINE,
      to,
      sx,
      openInNewTab = Boolean(href),
      ...restOfProps
    } = props;
    const currentPath = usePathname();
    const destination = to ?? href ?? '';
    const pathname =
      typeof destination === 'string' ? destination : destination.pathname;
    const className = clsx(classNameProps, {
      [activeClassName]: pathname == currentPath && activeClassName,
    });

    const isExternal =
      typeof destination === 'string' &&
      (destination.startsWith('http') || destination.startsWith('mailto:'));

    const propsToRender = {
      color,
      underline, // 'hover' | 'always' | 'none'
      ...(openInNewTab && EXTERNAL_LINK_PROPS),
      ...restOfProps,
    };

    if (isExternal) {
      if (noLinkStyle) {
        return (
          <a
            className={className}
            href={destination as string}
            ref={ref as any}
            {...propsToRender}
          />
        );
      }

      return (
        <MuiLink
          className={className}
          href={destination as string}
          ref={ref}
          sx={sx}
          {...propsToRender}
        />
      );
    }

    if (noLinkStyle) {
      return (
        <NextLinkComposed
          className={className}
          ref={ref as any}
          to={destination}
          {...propsToRender}
        />
      );
    }

    return (
      <MuiLink
        component={NextLinkComposed}
        linkAs={linkAs}
        className={className}
        ref={ref}
        to={destination}
        sx={sx}
        {...propsToRender}
      />
    );
  }
);

export default AppLinkForNext;
