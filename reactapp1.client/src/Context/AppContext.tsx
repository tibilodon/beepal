import {
  createContext,
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

import { GetCartItems } from "../Helpers/dataAccessors/cookieFetcher";
import {
  ProductDetail,
  ProductDetailDto,
  UserDto,
} from "../Helpers/Types/commonTypes";
import {
  initialProductDetailDto,
  initialProductDetails,
  initialUserDto,
} from "../Helpers/initialDatas/initialData";
import { GetAllProducts } from "../Helpers/dataAccessors/productFetcher";

type AppContextProviderType = {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;

  userDto: UserDto;
  setUserDto: Dispatch<SetStateAction<UserDto>>;
  //  cart - order
  checkCartItems: () => Promise<boolean>;
  cartItems: ProductDetailDto[];
  setCartItems: Dispatch<SetStateAction<ProductDetailDto[]>>;
  cartCounter: number;
  setCartCounter: Dispatch<SetStateAction<number>>;
  totalAmount: number;
  setTotalAmount: Dispatch<SetStateAction<number>>;

  checkUser: () => void;
  resetShowStates: () => void;
  sideNav: boolean;
  setSideNav: Dispatch<SetStateAction<boolean>>;
  showLogin: boolean;
  setShowLogin: Dispatch<SetStateAction<boolean>>;
  showRegister: boolean;
  setShowRegister: Dispatch<SetStateAction<boolean>>;
  showForgotPassword: boolean;
  setShowForgotPassword: Dispatch<SetStateAction<boolean>>;
  showResendEmailConfirmation: boolean;
  setShowResendEmailConfirmation: Dispatch<SetStateAction<boolean>>;
  showManageUser: boolean;
  setShowManageUser: Dispatch<SetStateAction<boolean>>;
  showUserProfile: boolean;
  setShowUserProfile: Dispatch<SetStateAction<boolean>>;
  showCartSidebar: boolean;
  setShowCartSidebar: Dispatch<SetStateAction<boolean>>;

  //  products
  products: ProductDetail[];
  setProducts: Dispatch<SetStateAction<ProductDetail[]>>;
  getProductsData: () => void;
  //  loader
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

const AppContext = createContext<AppContextProviderType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},

  userDto: initialUserDto,
  setUserDto: () => {},
  //  cart - order
  checkCartItems: async () => Promise.resolve(false),
  cartItems: [initialProductDetailDto],
  setCartItems: () => {},
  cartCounter: 0,
  setCartCounter: () => {},
  totalAmount: 0,
  setTotalAmount: () => {},

  checkUser: async () => Promise<void>,
  resetShowStates: () => {},
  sideNav: false,
  setSideNav: () => {},
  showLogin: false,
  setShowLogin: () => {},
  showRegister: false,
  setShowRegister: () => {},
  showForgotPassword: false,
  setShowForgotPassword: () => {},
  showResendEmailConfirmation: false,
  setShowResendEmailConfirmation: () => {},
  showManageUser: false,
  setShowManageUser: () => {},
  showUserProfile: false,
  setShowUserProfile: () => {},
  showCartSidebar: false,
  setShowCartSidebar: () => {},
  //  products
  products: [initialProductDetails],
  setProducts: () => {},
  getProductsData: () => Promise<void>,
  //  loader
  isLoading: false,
  setIsLoading: () => {},
});
export const useAppProvider = () => {
  return useContext(AppContext);
};

type ProviderProps = {
  children: React.ReactNode;
};

export default function AppContextProvider({ children }: ProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDto, setUserDto] = useState<UserDto>(initialUserDto);
  const [sideNav, setSideNav] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showRegister, setShowRegister] = useState<boolean>(false);
  const [showForgotPassword, setShowForgotPassword] = useState<boolean>(false);
  const [showResendEmailConfirmation, setShowResendEmailConfirmation] =
    useState<boolean>(false);
  const [showManageUser, setShowManageUser] = useState<boolean>(false);
  const [showUserProfile, setShowUserProfile] = useState<boolean>(false);
  //  cart - order
  const [showCartSidebar, setShowCartSidebar] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<ProductDetailDto[]>([
    initialProductDetailDto,
  ]);
  const [cartCounter, setCartCounter] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  //  products
  const [products, setProducts] = useState<ProductDetail[]>([
    initialProductDetails,
  ]);

  // TODO: check the need for setTimeout in production.
  //  error cause: server is not available on initialization (app start), to avoid such bottleneck a small delay is placed between the initial render and the data fetch
  useEffect(() => {
    setIsLoading(true);
    async function getData() {
      const responses = await Promise.all([
        checkUser(),
        checkCartItems(),
        getProductsData(),
      ]);
      const allResponsesSuccessful = responses.every(
        (response) => response !== false
      );
      if (allResponsesSuccessful) {
        setIsLoading(false);
      }
    }
    const timeoutId = setTimeout(() => {
      getData();
      //  !Initial delay
    }, 1000);

    console.log("context useEffect ran");
    return () => clearTimeout(timeoutId);
  }, []);

  async function checkCartItems(): Promise<boolean> {
    const result = await GetCartItems();
    setCartItems(result.products);
    setCartCounter(result.itemCounter);
    setTotalAmount(result.totalAmount);
    return true;
  }

  async function checkUser(): Promise<boolean> {
    const response = await fetch("/api/user");
    const data = await response.json();
    if (response.ok) {
      setIsLoggedIn(data.isLoggedIn);
      if (data.userDto) {
        setUserDto(data.userDto);
      }
      return true;
    }
    return false;
  }

  async function getProductsData(): Promise<boolean> {
    const result = await GetAllProducts();
    if (result?.errors) {
      // TODO: set error
      console.log(result.errors);
      return false;
    }
    if (result?.products !== null) {
      setProducts(result.products);
      return true;
    }
    return true;
  }

  function resetShowStates(): void {
    setSideNav(false);
    setShowLogin(false);
    setShowRegister(false);
    setShowForgotPassword(false);
    setShowResendEmailConfirmation(false);
    setShowManageUser(false);
    setShowUserProfile(false);
    setShowCartSidebar(false);
  }

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userDto,
        setUserDto,

        checkUser,
        resetShowStates,
        sideNav,
        setSideNav,
        showLogin,
        setShowLogin,
        showRegister,
        setShowRegister,
        showForgotPassword,
        setShowForgotPassword,
        showResendEmailConfirmation,
        setShowResendEmailConfirmation,
        showManageUser,
        setShowManageUser,
        showUserProfile,
        setShowUserProfile,
        //  cart - order
        showCartSidebar,
        setShowCartSidebar,
        cartItems,
        setCartItems,
        cartCounter,
        setCartCounter,
        checkCartItems,
        totalAmount,
        setTotalAmount,
        //  products
        products,
        setProducts,
        getProductsData,
        //  loader
        isLoading,
        setIsLoading,
      }}
    >
      <>{children}</>
    </AppContext.Provider>
  );
}
