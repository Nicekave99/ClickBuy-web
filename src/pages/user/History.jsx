import React from "react";
import HistoryCard from "../../components/card/HistoryCard";
import { Helmet } from "react-helmet";

const History = () => {
  return (
    <div>
      <Helmet>
        <title>ประวัติการสั่งซื้อ - ClickBuy</title>
        <meta name="description" content="คำอธิบายหน้าแรก" />
      </Helmet>

      <HistoryCard />
    </div>
  );
};

export default History;
