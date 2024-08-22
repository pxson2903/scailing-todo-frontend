import { HTMLAttributes } from 'react';

export interface FormInputProps {
  name: string;
  control: any;
  label: string;
  type?: React.InputHTMLAttributes<unknown>['type'];
  className?: string & Pick<HTMLAttributes<HTMLElement>, 'className'>;
  multiline?: boolean;
}
