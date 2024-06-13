import styles from "./admin.module.css";
import { useEffect, useState } from "react";
import {
  AddProduct,
  DeleteProduct,
  GetAllProducts,
} from "../../Helpers/dataAccessors/adminFetcher";
import { ProductDetail } from "../../Helpers/Types/commonTypes";
import { initialProductDetails } from "../../Helpers/initialDatas/initialData";
import ButtonA from "../../Components/buttons/ButtonA";
import { useAppProvider } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";
import ProductForm from "../../Components/form/admin/product/ProductForm";
import Loader from "../../Components/Loader/Loader";
function AdminHome() {
  const navigate = useNavigate();
  const { isLoading, setIsLoading } = useAppProvider();
  const [products, setProducts] = useState<ProductDetail[]>([
    initialProductDetails,
  ]);
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const data = await GetAllProducts();
      console.log(data);
      if (data?.errors) {
        navigate("/");
      }
      if (data?.products !== null) {
        setProducts(data.products);
      }
      setIsLoading(false);
    };
    getData();
  }, [navigate, setIsLoading]);

  const [formData, setFormData] = useState<ProductDetail>(
    initialProductDetails
  );

  const onChangeHandler = (
    e: React.FormEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { id, value } = e.currentTarget;

    setFormData((prevVals: ProductDetail) => ({
      ...prevVals,
      //  turn value into enum value
      [id]: id === "category" || id === "packaging" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await AddProduct(formData);
    setProducts(result);
    setFormData(initialProductDetails);
  };

  const handleDelete = async (e: React.MouseEvent<HTMLElement>, id: string) => {
    e.preventDefault();
    const result = await DeleteProduct(id);
    setProducts(result);
    setFormData(initialProductDetails);
  };

  function scrollToCreate() {
    window.scroll({
      top: document.body.offsetHeight,
      left: 0,
      behavior: "smooth",
    });
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className={styles.wrap}>
        <h1>welcome admin</h1>
        <h1 className="danger">Your products</h1>
        <span className={styles.createBtn}>
          <ButtonA label="Add Product" color="basic" onClick={scrollToCreate} />
        </span>
        {products &&
          products.map((item, index) => {
            //  convert category and packaging to readable form
            let category: string;
            let packaging: string;
            switch (item.category) {
              case 2:
                category = "Méhészeti termékek";
                break;

              default:
                category = "Méz";
                break;
            }
            switch (item.packaging) {
              case 2:
                packaging = "500g";
                break;
              case 3:
                packaging = "750g";
                break;

              default:
                packaging = "250g";
                break;
            }
            return (
              <div className={styles.products} key={index}>
                <p>{item.id}</p>
                <p>{item.name}</p>
                <p>{category}</p>
                <p>{packaging}</p>
                <p>{item.packaging}</p>
                <p>{item.packaging}</p>

                <ButtonA
                  label="Update"
                  color="success"
                  onClick={() => navigate(`edit/${item.id}`)}
                />
                <ButtonA
                  label="Delete"
                  color="danger"
                  onClick={(e) => handleDelete(e, item.id!)}
                />
              </div>
            );
          })}
      </div>

      <div className={styles.wrap}>
        <h1>ADD PRODUCT</h1>
        <ProductForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          onChangeHandler={onChangeHandler}
        />
      </div>
    </>
  );
}

export default AdminHome;
