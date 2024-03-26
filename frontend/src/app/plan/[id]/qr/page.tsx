"use client";

import TopBar3 from "@/components/common/top-bar3";
import Title from "@/components/common/title";
import styles from "./qr.module.scss";
import { ProductCard } from "@/components/common/product-card";
import QRCode from "@/components/plan/qr-img";
import { ProductSm } from "@/types/product";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getDealCodeAPI } from "@/services/deals";

const product: ProductSm = {
  id: 1,
  thumbnail_image: "https://picsum.photos/40/40",
  title: "제품 샘플입니다.",
  price: 13000,
};

export default function DealPay() {
  const params = useParams<{ id: string }>();
  const [code, setCode] = useState<string>();

  const getCode = async () => {
    const res = await getDealCodeAPI({ dealId: params.id });
    setCode(res);
  };

  useEffect(() => {
    getCode();
  }, []);

  return (
    <div className={styles.qr}>
      <TopBar3 />
      <Title title="거래를 확정해주세요" subtitle="QR코드를 스캔해주세요" />
      <ProductCard product={product} />
      <div className="flex justify-center w-full">{code ? <QRCode code={code} /> : <></>}</div>
    </div>
  );
}
