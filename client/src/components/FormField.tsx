import { useEffect, useState } from 'react';

interface FormFieldProps {
  label: string;
  className?: string;
  input: {
    id?: string;
    type: string;
    placeholder?: string;
    name: string;
    required?: boolean;
    value?: string;
    disabled?: boolean;
    checked?: boolean;
    onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  };
}

const FormField = ({ label, className, input }: FormFieldProps) => {
  const [value, setValue] = useState(input.value);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setValue(input.value);
    setChecked(input.checked || false);
  }, [input.value, input.checked]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked((prev) => !prev);
    setValue(e.target.value);
    input.onChange?.(e);
  };

  return (
    <div>
      <label htmlFor={input.name}>{label}</label>
      <input
        className={className}
        type={input.type}
        placeholder={input.placeholder}
        id={input.name}
        name={input.name}
        required={input.required || false}
        value={value}
        disabled={input.disabled || false}
        onChange={onChange}
        checked={checked}
      />
    </div>
  );
};
export default FormField;
