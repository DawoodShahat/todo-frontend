import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getMe } from "@/api";

interface IAuth {
  user: {
    name: string
    email: string
  } | null;
  setUser: any
  logoutUser: any
}

const AuthContext = createContext<IAuth>({
  user: null,
  setUser: null,
  logoutUser: null
});

export const useAuth = () => {
  return useContext(AuthContext);
};

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  const logoutUser = () => {
    localStorage.removeItem('token');
    setUser(null)
  };

  const fetchMe = async () => {
    setIsLoading(true);
    try {
      const res = await getMe();
      setUser(res.data);
    }catch(err){
      console.log(err);
    }finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMe();
  }, []);

  const value = {
    user,
    setUser,
    logoutUser
  };

  return (
    <AuthContext.Provider value={value}>
      {isLoading ? <h1>Loading...</h1> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
