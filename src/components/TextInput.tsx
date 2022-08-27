import {
  Control,
  Controller,
  FieldValues,
  Path,
  ValidationRule,
} from 'react-hook-form';
import {
  TextInput as TextInputRn,
  TextInputProps as TextInputPropsRn,
} from 'react-native';

interface TextInputProps<TFieldValues> extends TextInputPropsRn {
  control: Control<TFieldValues, any>;
  name: Path<TFieldValues>;
  defaultValue?: any;
  required?: string | ValidationRule<boolean>;
  pattern?: ValidationRule<RegExp>;
}

export function TextInput<TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  defaultValue,
  required,
  pattern,
  ...others
}: TextInputProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      rules={{
        required,
        pattern,
      }}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <TextInputRn
          ref={ref}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          {...others}
        />
      )}
      name={name}
    />
  );
}
