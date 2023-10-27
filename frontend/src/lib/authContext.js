import { createContext,useContext,useEffect,useState } from "react";
import { getUserFromCookie } from "../lib/auth";

let userState;
const User = createContext({user:null,loading:false});

export const UserProvider = ({children,value}) => {
    const {user} = value;
    useEffect(() => {
        if(!userState && user){
            userState = user;
        }
    },[]);   
    return <User.Provider value={value}>{children}</User.Provider>
};

export const useUser = () => useContext(User);

export const useUserFetcher=()=>{
    const [data,setUser] = useState({
        user:userState || null,
        loading:userState === undefined,
    });

    useEffect(() => {
        if(useState!==undefined){
            return;
        }

        let isMounted = true;
        const user = getUserFromCookie();
        if(!isMounted){
           setUser({user,loading:false});
        }

        return () => {
            isMounted = false;
        };
    },[]);
    return data;
};