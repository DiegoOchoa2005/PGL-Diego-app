import React from "react";
import WelcomePage from "../components/Welcome";
import { StatusBar } from "expo-status-bar";

const AppPage = () => {
  return (
    <>
      <StatusBar style="auto" />
      <WelcomePage />
    </>
  );
};

export default AppPage;
