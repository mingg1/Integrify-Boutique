import ProductForm from 'components/ProductForm';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'redux/hooks';
import { addProduct } from 'redux/slices/productsSlice';
import { ProductInput } from 'utils/types';

const AddProduct = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const addAction = async (input: ProductInput) => {
    const resultAction = await dispatch(addProduct(input));
    if (addProduct.fulfilled.match(resultAction)) {
      alert('Product added! ✨🛍');
      navigate(-1);
    }
  };

  return (
    <main style={{ marginBottom: '6rem' }}>
      <h1 className="page__title">Add product</h1>
      <section className="product-form__container">
        <ProductForm editMode={false} submitAction={addAction} />
      </section>
    </main>
  );
};

export default AddProduct;
