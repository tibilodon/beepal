import {
    createContext,
    useContext,
    useEffect,
    useState,
    Dispatch,
    SetStateAction,
} from "react";

export type UserDto = {
    id: string,
    userName: string,
    nickName: string,
    email: string
}

type AppContextProviderType = {
    isLoggedIn: boolean;
    userDto: UserDto;
    setUserDto: Dispatch<SetStateAction<UserDto>>,
    checkUser: () => {};
    sideNav: boolean;
    setSideNav: Dispatch<SetStateAction<boolean>>;
    showLogin: boolean;
    setShowLogin: Dispatch<SetStateAction<boolean>>;
    showRegister: boolean;
    setShowRegister: Dispatch<SetStateAction<boolean>>;
};
export const initialUserDto = {
    id: "",
    userName: "",
    nickName: "",
    email: ""
}
const AppContext = createContext<AppContextProviderType>({
    isLoggedIn: false,
    userDto: initialUserDto,
    setUserDto: () => { },
    checkUser: async() => Promise<void>,
    sideNav: false,
    setSideNav: () => { },
    showLogin: false,
    setShowLogin: () => { },
    showRegister: false,
    setShowRegister: () => { },
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

    useEffect(() => {
       checkUser();
    }, [])

    async function checkUser():Promise<void> {
        const response = await fetch("/api/user");
        const data = await response.json();

        setIsLoggedIn(data.isLoggedIn);
        if (data.userDto) {
            setUserDto(data.userDto);
        }
    };

    return (

        <AppContext.Provider
            value={{
                isLoggedIn,
                userDto,
                setUserDto,
                checkUser,
                sideNav,
                setSideNav,
                showLogin,
                setShowLogin,
                showRegister,
                setShowRegister
            }}
        >
            <>{children}</>
        </AppContext.Provider>

    );
}