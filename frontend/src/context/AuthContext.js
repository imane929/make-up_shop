import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

/*
Gère l'utilisateur connecté
*/

export const AuthProvider = ({children}) => {

const [user,setUser] = useState(
JSON.parse(localStorage.getItem("user"))
);

const login = (data) => {

localStorage.setItem("user",JSON.stringify(data.user));
localStorage.setItem("token",data.token);
localStorage.setItem("userId",data.user._id || data.user.id);

setUser(data.user);

window.dispatchEvent(new Event('userLogin'));

};

const logout = () => {

localStorage.removeItem("user");
localStorage.removeItem("token");
// Keep userId for restoring cart/recently viewed on next login

setUser(null);

};

return(

<AuthContext.Provider value={{user,login,logout}}>

{children}

</AuthContext.Provider>

);

};

export const useAuth = () => useContext(AuthContext);