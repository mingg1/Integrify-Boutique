import { useState } from 'react';
import { useAppSelector } from 'redux/hooks';
import {
  Product,
  ProductCategory,
  ProductInput,
  Size,
  SubmitEvent,
} from 'utils/types';
import Checkbox from './Checkbox';
import FormField from './FormField';

interface ProductFormInputs extends HTMLFormControlsCollection {
  readonly name: HTMLInputElement;
  readonly price: HTMLInputElement;
  readonly description: HTMLInputElement;
  readonly quantity: HTMLInputElement;
  readonly thumbnail: HTMLInputElement;
}
interface ProductFormElement extends HTMLFormElement {
  readonly elements: ProductFormInputs;
}

const getCheckedFields = (elements: ProductFormInputs, className: string) =>
  Array.from(elements)
    .filter((element) => {
      const input = element as HTMLInputElement;
      return input.checked && input.className === className;
    })
    .map((element) => (element as HTMLInputElement).name);

interface ProductFormProps {
  product?: Product;
  submitAction?: (input: ProductInput) => Promise<void>;
  editMode: boolean;
}

const ProductForm = ({ product, submitAction, editMode }: ProductFormProps) => {
  const { token } = useAppSelector((state) => state.loggedInUser);

  const [urlField, setUrlField] = useState<boolean>(true);
  const [uploadField, setUploadField] = useState<boolean>(false);

  const handleSubmit: SubmitEvent<ProductFormElement> = async (event) => {
    event.preventDefault();
    const form = event.currentTarget.elements;
    const sizes = getCheckedFields(form, 'sizes');
    const categories = getCheckedFields(form, 'categories');

    const { name, price, description, quantity, thumbnail } = form;
    const input: ProductInput = {
      name: name.value,
      price: +price.value,
      description: description.value,
      quantity: +quantity.value,
      size: sizes as Size[],
      category: categories as ProductCategory[],
      token,
    };
    if (thumbnail.value) {
      input.thumbnail = thumbnail.value;
    }
    if (product) {
      input._id = product._id;
    }

    console.log(input);
    await submitAction?.(input);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormField
        label="Product name *"
        input={{
          type: 'text',
          placeholder: 'Product name',
          name: 'name',
          required: true,
          value: product?.name,
        }}
      />
      <FormField
        label="Description"
        input={{
          type: 'text',
          placeholder: 'Description for the product',
          name: 'description',
          value: product?.description,
        }}
      />
      <FormField
        label="Price (€) *"
        input={{
          type: 'number',
          placeholder: 'Price',
          name: 'price',
          required: true,
          value: product?.price?.toString(),
        }}
      />
      <FormField
        label="Quantity"
        input={{
          type: 'number',
          placeholder: 'Quantity',
          name: 'quantity',
          required: true,
          value: product?.quantity?.toString(),
        }}
      />
      <div className="product-form__thumbnail-btn__container">
        <button
          onClick={(event) => {
            event.preventDefault();
            setUrlField(true);
            setUploadField(false);
          }}
        >
          url
        </button>
        <button
          onClick={(event) => {
            event.preventDefault();
            setUrlField(false);
            setUploadField(true);
          }}
        >
          upload
        </button>
      </div>
      {urlField ? (
        <FormField
          label="Thumbnail"
          input={{
            type: 'text',
            placeholder: 'Thumbnail URL',
            name: 'thumbnail',
          }}
        />
      ) : null}
      {uploadField ? <input type="file" name="thumbnail" /> : null}

      <Checkbox
        property={product?.category}
        label="Categories"
        options={ProductCategory}
      />
      <Checkbox property={product?.size} label="Sizes" options={Size} />
      <button type="submit">{editMode ? 'Edit Product' : 'Add Product'}</button>
    </form>
  );
};
export default ProductForm;
