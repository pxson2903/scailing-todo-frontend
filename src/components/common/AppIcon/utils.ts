import { SVGAttributes } from 'react';

export interface IconProps extends SVGAttributes<SVGElement> {
  color?: string;
  icon?: string;
  size?: string | number;
  title?: string;
}
