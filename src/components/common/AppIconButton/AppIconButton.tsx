import { ElementType, FunctionComponent, useMemo } from 'react';
import {
  Tooltip,
  IconButton,
  IconButtonProps,
  TooltipProps,
} from '@mui/material';
import AppIcon from '../AppIcon';
import AppLink from '../AppLink';
import { alpha } from '@mui/material';
import { Props } from '../AppIcon/AppIcon';
import { IconName } from '../AppIcon/config';

export const MUI_ICON_BUTTON_COLORS = [
  'inherit',
  'default',
  'primary',
  'secondary',
  'success',
  'error',
  'info',
  'warning',
];

export interface AppIconButtonProps extends Omit<IconButtonProps, 'color'> {
  color?: string;
  icon?: IconName | string;
  iconProps?: Partial<Props>;
  component?: ElementType;
  to?: string;
  href?: string;
  openInNewTab?: boolean;
  tooltipProps?: Partial<TooltipProps>;
}

const AppIconButton: FunctionComponent<AppIconButtonProps> = ({
  color = 'default',
  component,
  children,
  disabled,
  icon,
  iconProps,
  sx,
  title,
  tooltipProps,
  ...restOfProps
}) => {
  const componentToRender =
    !component && (restOfProps?.href || restOfProps?.to)
      ? AppLink
      : (component ?? IconButton);

  const isMuiColor = useMemo(
    () => MUI_ICON_BUTTON_COLORS.includes(color),
    [color]
  );

  const iconButtonToRender = useMemo(() => {
    const colorToRender = isMuiColor
      ? (color as IconButtonProps['color'])
      : 'default';
    const sxToRender = {
      ...sx,
      ...(!isMuiColor && {
        color: color,
        ':hover': {
          backgroundColor: alpha(color, 0.04),
        },
      }),
    };
    return (
      <IconButton
        component={componentToRender}
        color={colorToRender}
        disabled={disabled}
        sx={sxToRender}
        {...restOfProps}
      >
        <AppIcon icon={icon} {...iconProps} />
        {children}
      </IconButton>
    );
  }, [
    color,
    componentToRender,
    children,
    disabled,
    icon,
    isMuiColor,
    sx,
    iconProps,
    restOfProps,
  ]);

  return title && !disabled ? (
    <Tooltip title={title} {...tooltipProps}>
      {iconButtonToRender}
    </Tooltip>
  ) : (
    iconButtonToRender
  );
};

export default AppIconButton;
