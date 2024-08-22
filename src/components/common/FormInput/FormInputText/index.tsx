import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { FormInputProps } from '../FormInputProps';

const FormInputText = ({
  name,
  control,
  label,
  type,
  className,
}: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          InputLabelProps={{ shrink: true }}
          helperText={error ? error.message : null}
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          variant="outlined"
          type={type}
          className={className}
        />
      )}
    />
  );
};

export default FormInputText;
