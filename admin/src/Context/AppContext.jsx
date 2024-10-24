import { createContext } from "react";

export const AppContext=createContext();

const AppContextProvider=(props)=>{
    const currency=`$`
const calculateAge=(dob)=>{
const today=new Date();
const birDate=new Date(dob);

let age=today.getFullYear()-birDate.getFullYear()
return age;
}
    const value={currency,
calculateAge
}

return (
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
)
}
export default AppContextProvider;