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
    email:string
}

type AppContextProviderType = {
    isLoggedIn: boolean,
    userDto: UserDto,
    setUserDto: Dispatch<SetStateAction<UserDto>>;
    checkUser: () => {}
};
export const initialUserDto = {
    id: "",
    userName: "",
    nickName: "",
    email:""
}
const AppContext = createContext<AppContextProviderType>({
    isLoggedIn: false,
    userDto: initialUserDto,
    setUserDto: () => { },
    checkUser:()=>Promise<void>


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

    useEffect(() => {   
        checkUser();
    }, [])

    async function checkUser() {
        const response = await fetch("/api/user");
        const data = await response.json();
  
        setIsLoggedIn(data.isLoggedIn);
        if (data.userDto) {
            setUserDto(data.userDto);

        }
    }

    return (

        <AppContext.Provider
            value={{
                isLoggedIn,
                userDto,
                setUserDto,
                checkUser
            }}
        >
            <>{children}</>
        </AppContext.Provider>

    );
}