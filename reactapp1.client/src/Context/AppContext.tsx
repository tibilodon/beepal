import {
  createContext,
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

import { GetCartItems } from "../Helpers/dataAccessors/cookieFetcher";
import { CartData, CartItem } from "../Helpers/Types/commonTypes";

export type UserDto = {
  id: string;
  userName: string;
  nickName: string;
  email: string;
};

type AppContextProviderType = {
  isLoggedIn: boolean;
  userDto: UserDto;
  setUserDto: Dispatch<SetStateAction<UserDto>>;
  cartItems: CartItem[];
  setCartItems: Dispatch<SetStateAction<CartItem[]>>;
  cartCounter: number;
  setCartCounter: Dispatch<SetStateAction<number>>;
  checkCartItems: () => void;

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
};
export const initialUserDto = {
  id: "",
  userName: "",
  nickName: "",
  email: "",
};

export const initialCartItems: CartItem[] = [
  {
    Id: "",
    Name: "",
    Quantity: 0,
    Variant: "",
  },
];

const AppContext = createContext<AppContextProviderType>({
  isLoggedIn: false,
  userDto: initialUserDto,
  setUserDto: () => {},
  cartItems: initialCartItems,
  setCartItems: () => {},
  cartCounter: 0,
  setCartCounter: () => {},
  checkCartItems: async () => Promise<void>,

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
  const [showCartSidebar, setShowCartSidebar] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [cartCounter, setCartCounter] = useState<number>(0);

  useEffect(() => {
    checkUser();
    checkCartItems();
  }, []);

  async function checkCartItems(): Promise<void> {
    const result: CartData = await GetCartItems();
    setCartItems(result.cartItems);
    setCartCounter(result.itemCounter);
  }

  async function checkUser(): Promise<void> {
    const response = await fetch("/api/user");
    const data = await response.json();

    setIsLoggedIn(data.isLoggedIn);
    if (data.userDto) {
      setUserDto(data.userDto);
    }
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
        userDto,
        setUserDto,
        cartItems,
        setCartItems,
        cartCounter,
        setCartCounter,
        checkCartItems,

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
        showCartSidebar,
        setShowCartSidebar,
      }}
    >
      <>{children}</>
    </AppContext.Provider>
  );
}
