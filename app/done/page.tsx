import React from "react";
import { cookies } from "next/headers";

const page = () => {
  const nextCookies = cookies();
  const orderNoCookie = nextCookies.get("orderNo");
  const orderNo: number = Number(orderNoCookie?.value);
  return (
    <>
      <h1>THANK YOU FOR YOUR ORDER, WE WILL GET IN TOUCH SOON...</h1>
      <h1>ORDER NUMBER: {orderNo}</h1>
    </>
  );
};

export default page;
