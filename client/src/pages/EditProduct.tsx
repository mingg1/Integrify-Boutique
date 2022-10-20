import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import ProductForm from 'components/ProductForm';
import { useEffect } from 'react';
import {
  deleteProduct,
  editProduct,
  findProduct,
} from 'redux/slices/productsSlice';
import { ProductInput } from 'utils/types';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    loggedInUser: { token },
    productsData: { product },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const editAction = async (input: ProductInput) => {
    const resultAction = await dispatch(editProduct(input));

    if (editProduct.fulfilled.match(resultAction)) {
      alert('Product edited! ✨🛍');
      navigate(-1);
    }
  };

  useEffect(() => {
    dispatch(findProduct(id));
  }, [dispatch, id]);

  return (
    <main style={{ marginBottom: '6rem' }}>
      <h1 className="page__title">Edit product</h1>
      <section className="product-form__container">
        <figure>
          <img src={product?.thumbnail} alt={product?.name} />
        </figure>
        <ProductForm
          product={product}
          submitAction={editAction}
          editMode={true}
        />
        <button
          className="delete-button"
          onClick={() => {
            dispatch(deleteProduct({ _id: id, token }));
            navigate(-1);
          }}
        >
          Delete product
        </button>
      </section>
    </main>
  );
};

export default EditProduct;
