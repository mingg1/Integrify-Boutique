interface FormFieldProps {
  label: string;
  input: {
    type: string;
    placeholder: string;
    name: string;
    required?: boolean;
    value?: string;
    disabled?: boolean;
    onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  };
}

const FormField = ({ label, input }: FormFieldProps) => (
  <div>
    <label htmlFor={input.name}>{label}</label>
    <input
      type={input.type}
      placeholder={input.placeholder}
      id={input.name}
      name={input.name}
      required={input.required || false}
      value={input.value}
      disabled={input.disabled || false}
      onChange={input.onChange}
    />
  </div>
);
export default FormField;
