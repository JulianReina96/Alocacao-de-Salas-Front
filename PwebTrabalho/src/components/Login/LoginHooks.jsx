import { useState } from "react";
import { FetcherFactory } from "../../data/fetchers/FetcherFactory";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { styleToastError } from "../../styles.js";
import {handleToken} from "../../utils.js";

const fetcherFactory = new FetcherFactory();

/**
 * Custom Hook - useLogin.
 * 
 * @description Hook customizado que retorna o estado e funções relacionadas ao login.
 * 
 * @property {Object} login Objeto contendo os campos email e password.
 * 
 * @example
 * const { login, setLogin, showPassword, setShowPassword, handleSubmit } = useLogin();
 * 
 * @returns {Object} Objeto contendo o estado e funções relacionadas ao login.
 */
export const useLogin = () => {
  const [login, setLogin] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [isValidCredentials, setIsValidCredentials] = useState(true);

  const validateCredentials = () => {
    if (login.email === "" || !login.email.includes("@")) {
      toast.error("Email inválido. Por favor, insira um email válido.", {
        style: styleToastError,
        duration: 3000,
      });
      setIsValidCredentials(false);
    }
    if (!login.password || login.password.length < 4) {
      toast.error("Senha inválida. Por favor, insira uma senha válida.", {
        style: styleToastError,
        duration: 3000,
      });
      setIsValidCredentials(false);
    }
  }

  const handleSubmit = async (setIsLoading) => {
    validateCredentials();
    if(isValidCredentials) {
      setIsLoading(true)
      //const loginFetcher = fetcherFactory.createLoginFetcher();
      // const response = await loginFetcher.login(login.email, login.password);
      const response = {
        headers: {
            'authorization': 'fake-token',
            'userid': 'fake-user-id'
        }
    };
      setIsLoading(false)
      if(response.response && response.response.status === 401){
        toast.error("Login inválido", {
          style: styleToastError,
          duration: 3000,
        });
        return;
      }
      let token = handleToken(response.headers['authorization']);
      token = "Bearer " + "fake-token";
      let userID = response.headers['userid'];
      console.log(token);
      console.log(userID);
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("userID", userID);

      
      if (token) {
        navigate("/home");
      }
    }
  };

  return { login, setLogin, showPassword, setShowPassword, handleSubmit };
};
