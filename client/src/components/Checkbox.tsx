import { ProductCategory, Size } from 'utils/types';
import FormField from './FormField';

interface CheckboxProps<T> {
  label: string;
  options: { [key: number]: string };
  property?: T[];
}

const Checkbox = ({
  label,
  options,
  property,
}: CheckboxProps<Size> | CheckboxProps<ProductCategory>) => {
  return (
    <fieldset>
      <legend>{label}</legend>
      <div className="checkbox">
        {Object.values(options).map((value) => (
          <FormField
            className={label.toLowerCase()}
            key={value}
            label={value}
            input={{
              id: value,
              name: value,
              type: 'checkbox',
              checked: property?.some((item) => item === value),
            }}
          />
        ))}
      </div>
    </fieldset>
  );
};
export default Checkbox;
