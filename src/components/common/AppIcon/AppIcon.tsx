import { ComponentType, FunctionComponent, SVGAttributes } from 'react';
import { APP_ICON_SIZE } from '../../config';
import { IconName, ICONS } from './config';

export interface Props extends SVGAttributes<SVGElement> {
  color?: string;
  icon?: IconName | string;
  size?: string | number;
  title?: string;
}

const AppIcon: FunctionComponent<Props> = ({
  color,
  icon = 'default',
  size = APP_ICON_SIZE,
  style,
  ...restOfProps
}) => {
  const iconName = (icon || 'default').trim().toLowerCase() as IconName;

  let ComponentToRender: ComponentType = ICONS[iconName];
  if (!ComponentToRender) {
    console.warn(`AppIcon: icon "${iconName}" is not found!`);
    ComponentToRender = ICONS.default; // ICONS['default'];
  }

  const propsToRender = {
    height: size,
    color,
    fill: color && 'currentColor',
    size,
    style: { ...style, color },
    width: size,
    ...restOfProps,
  };

  return <ComponentToRender data-icon={iconName} {...propsToRender} />;
};

export default AppIcon;
