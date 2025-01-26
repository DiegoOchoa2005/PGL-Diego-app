import React, { useEffect, useState } from "react";
import { asyncStorageService } from "../services/asyncStorageService";
import { router } from "expo-router";

const AppPage = () => {
  const [isLogged, setIsLogged] = useState<boolean | null>(null);
  const handleToken = async () => {
    const token = await asyncStorageService.getItem();
    if (token) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  };
  useEffect(() => {
    handleToken();
  }, []);
  useEffect(() => {
    if (isLogged !== null) {
      if (isLogged) {
        router.push("../(drawer)/welcome/welcome");
      } else {
        router.push("../login/login");
      }
    }
  }, [isLogged]);
  return <></>;
};

export default AppPage;
