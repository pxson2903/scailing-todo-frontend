import { Controller } from 'react-hook-form';
import { FormInputProps } from '../FormInputProps';
import { FormControlLabel, Switch } from '@mui/material';

const FormInputSwitch = ({
  name,
  control,
  label,
  className,
}: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControlLabel
          control={<Switch checked={value} onChange={onChange} />}
          label={label}
          className={className}
        />
      )}
    />
  );
};

export default FormInputSwitch;
