import styles from "./admin.module.css";
import { useEffect, useState } from "react";
import {
  DeleteProduct,
  GetAllProductsAdmin,
} from "../../Helpers/dataAccessors/adminFetcher";
import ButtonA from "../../Components/buttons/ButtonA";
import { useAppProvider } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import { AdminProductDetailDto } from "../../Helpers/Types/commonTypes";
import { initialAdminProductDetailsDto } from "../../Helpers/initialDatas/initialData";
function AdminHome() {
  const navigate = useNavigate();
  const { isLoading, setIsLoading } = useAppProvider();
  const [adminProducts, setAdminProducts] = useState<AdminProductDetailDto[]>([
    initialAdminProductDetailsDto,
  ]);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const data = await GetAllProductsAdmin();
      if (data?.errors) {
        console.log(data.errors);
        navigate("/");
      }
      if (data?.products !== null) {
        setAdminProducts(data.products);
      }
      setIsLoading(false);
    };
    getData();
  }, [navigate, setIsLoading]);

  const handleDelete = async (e: React.MouseEvent<HTMLElement>, id: string) => {
    e.preventDefault();
    const result = await DeleteProduct(id);
    setAdminProducts(result);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className={styles.wrap}>
        <h1>welcome admin</h1>
        <h1 className="danger">Your products</h1>

        {adminProducts &&
          adminProducts.map((item, index) => {
            return (
              <div className={styles.products} key={index}>
                {Object.entries(item)
                  .filter(([, value]) => typeof value != "object")
                  .map(([key, value], i) => {
                    //  convert category and packaging to readable form
                    if (key === "category" && value === 1) {
                      return (
                        <span key={i} className={styles.detail}>
                          {key}
                          <p>&nbsp;Méz</p>
                        </span>
                      );
                    }
                    if (key === "category" && value === 2) {
                      return (
                        <span key={i} className={styles.detail}>
                          {key}:<p>&nbsp;Méhészeti termékek</p>
                        </span>
                      );
                    }

                    if (key === "packaging" && value === 1) {
                      return (
                        <span key={i} className={styles.detail}>
                          {key}:<p>&nbsp;250g</p>
                        </span>
                      );
                    }
                    if (key === "packaging" && value === 2) {
                      return (
                        <span key={i} className={styles.detail}>
                          {key}:<p>&nbsp;500g</p>
                        </span>
                      );
                    }
                    if (key === "packaging" && value === 3) {
                      return (
                        <span key={i} className={styles.detail}>
                          {key}:<p>&nbsp;750g</p>
                        </span>
                      );
                    }

                    return (
                      <span key={i} className={styles.detail}>
                        {key}:<p>&nbsp;{value.toString()}</p>
                      </span>
                    );
                  })}

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

      {/* <div className={styles.wrap}>
        <h1>ADD PRODUCT</h1>
        <ProductForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          onChangeHandler={onChangeHandler}
        />
      </div> */}
    </>
  );
}

export default AdminHome;
