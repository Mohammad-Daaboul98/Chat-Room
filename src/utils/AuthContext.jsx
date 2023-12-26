import { createContext, useContext, useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { account } from "../appwriteConfig";
import { toast } from "react-toastify";
import { ID } from "appwrite";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const Navigate = useNavigate();

  useEffect(() => {
    getUserOnLoad();
  }, []);

  const getUserOnLoad = async () => {
    try {
      let accountDetails = await account.get();
      setUser(accountDetails);
    } catch (error) {
      // console.info(error);
    }
    setLoading(false);
  };

  const handleUserLogin = async (e, credentials) => {
    e.preventDefault();

    try {
      await account.createEmailSession(credentials.email, credentials.password);
      const accountDetails = await account.get();
      setUser(accountDetails);
      toast.success("User Login");
      Navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleUserLogout = () => {
    account.deleteSession("current");
    toast.info("User Logout");
    setUser(null);
  };
  const handleUserRegister = async (e, credentials) => {
    e.preventDefault();

    if (credentials.password1 !== credentials.password2) {
      toast.error("Passwords did not match!");
      return;
    }

    try {
      await account.create(
        ID.unique(),
        credentials.email,
        credentials.password1,
        credentials.name
      );

      await account.createEmailSession(credentials.email, credentials.password1);
      const accountDetails = await account.get();
      setUser(accountDetails);
      toast.success("User Register");
      Navigate("/");

    } catch (error) {
      console.error(error);
    }
  };

  const contextData = {
    user,
    handleUserLogin,
    handleUserLogout,
    handleUserRegister,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? (
        <div className="center">
          <InfinitySpin
            visible={true}
            width="200"
            color="#db1a5a"
            ariaLabel="infinity-spin-loading"
          />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
