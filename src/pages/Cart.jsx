import React from "react";
import Checkout from "../components/card/Checkout";
import { Helmet } from "react-helmet";

const Cart = () => {
  return (
    <div>
      <Helmet>
        <title>ตะกร้า - ClickBuy</title>
        <meta name="description" content="คำอธิบายหน้าแรก" />
      </Helmet>

      <Checkout />
    </div>
  );
};

export default Cart;
