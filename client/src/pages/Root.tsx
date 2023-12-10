import React from "react";
import { Outlet } from "react-router";
import Header from "../components/common/Header";

const Root = (): JSX.Element => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Root;
