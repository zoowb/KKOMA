"use client";

import React, { Suspense, useEffect, useState } from "react";
import styles from "@/components/lists/lists-id.module.scss";
import { getProductDetail } from "@/components/lists/lists-ftn";

// 인터페이스
import { DetailParams } from "@/types/product";

import TopBar2 from "@/components/lists/lists-detail-bar";
import Profile from "@/components/lists/lists-detail-profile";
import Content from "@/components/lists/lists-detail-content";
import LocalStorage from "@/utils/localStorage";

import Map from "@/components/common/map";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Link from "next/link";
import ShareLocationIcon from "@mui/icons-material/ShareLocation";
import { sendUnWishAPI, sendWishAPI } from "@/services/wish";

interface IParams {
  params: { id: string };
}

export default function ProductDetail({ params: { id } }: IParams) {
  const [product, setProduct] = useState<DetailParams | null>(null);
  const [myId, setMyId] = useState<string | null>(null);
  const [liked, setLiked] = useState(false);

  const fetchData = async () => {
    setMyId(LocalStorage.getItem("memberId"));
    const res = await getProductDetail(id);
    setProduct(await res);
    setLiked(await res.data.wish);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLiked = async () => {
    if (liked) {
      await sendUnWishAPI(id);
      setLiked(false);
    } else {
      await sendWishAPI(id);
      setLiked(true);
    }
  };

  const settings = {
    // centerMode: true,
    autoplay: product && product.data.productImages.length > 1 ? true : false,
    // 이동부터 다음 이동까지의 시간
    autoplaySpeed: 2000,
    dots: true,
    arrows: false,
    infinite: product && product.data.productImages.length > 1 ? true : false,
    // 이동하는데 걸리는 시간
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className={styles.container}>
      <TopBar2 liked={liked} setLiked={setLiked} handleLiked={handleLiked} />
      <div className={styles.carousel}>
        <Slider {...settings}>
          {product?.data.productImages.map((img, index) => (
            <div key={index} className={styles.image}>
              <Image
                src={img ?? "/temp-img.svg"} // Route of the image file
                alt={`Slide ${index + 1}`}
                priority
                width={250} // Adjust as needed
                height={250} // Adjust as needed
                style={{ margin: "0 auto" }}
              />
            </div>
          ))}
        </Slider>
      </div>
      <Profile propsId={id} memberSummary={product?.data.memberSummary} />
      <Content propsId={id} product={product?.data} />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <ShareLocationIcon className="c-text1" />
          <div className={`min-w-fit text-body2 ${styles.dealPlace}`}>
            거래 장소
          </div>
        </div>
        <div className="text-body2 c-text2">서울시 강남구 테헤란로 10</div>
      </div>
      {/* <div className="text-caption c-text2">{product?.data.dealPlace}</div> */}
      {/* <Map /> */}
      {myId && myId === product?.data.memberSummary.memberId.toString() ? (
        <div className="flex gap-8 py-4">
          <Link href={`/my-trade/${id}`} className="w-full">
            <button className={`${styles.btn} ${styles.normal}`}>
              요청 보기
            </button>
          </Link>
          <Link href={`/lists/${id}/edit`} className="w-full">
            <button className={`${styles.btn} ${styles.normal} ${styles.gray}`}>
              상품 수정
            </button>
          </Link>
        </div>
      ) : (
        <div className="flex gap-8 py-4">
          <Link href={`/lists/${id}/request`} className="w-full">
            <button className={`${styles.btn} ${styles.normal}`}>
              거래 요청
            </button>
          </Link>
          <Link href={`/lists/${id}/chat`} className="w-full">
            <button className={`${styles.btn} ${styles.normal} ${styles.gray}`}>
              채팅 문의
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
