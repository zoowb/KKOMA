"use client";

import { useEffect, useState } from "react";
import { getMyPosts } from "../my-page-ftn";
import { ProductCard } from "@/components/common/product-card";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "next/link";

interface Post {
  id: number;
  thumbnailImage: string;
  title: string;
  dealPlace: string;
  price: number;
  status: "SALE" | "SOLD" | "PROGRESS";
  elapsedMinutes: string;
}

export default function MyProfilePosts() {
  const [expanded, setExpanded] = useState(false); // 아코디언 확장 상태 관리
  const [posts, setPosts] = useState<Post[]>([]);
  const [success, setSuccess] = useState(true);

  const getPosts = async () => {
    const res = await getMyPosts();
    setSuccess(res.success);
    if (res.success) {
      setPosts(res.data.myProductList);
    } else {
      setPosts([]);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const handleAccordionChange =
    (panel: boolean) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleCloseClick = () => {
    setExpanded(false); // 아코디언 닫기
  };

  return (
    <div className=" mx-auto my-8">
      <Accordion
        sx={{
          margin: "auto",
          minWidth: "200px",
          border: "2px solid #d3d3d3",
          "&.MuiPaper-root": { boxShadow: "none" },
        }}
        expanded={expanded}
        onChange={handleAccordionChange(true)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{ margin: "auto" }}
        >
          등록한 거래글 {posts.length}개
        </AccordionSummary>
        {posts.length === 0 && (<p className="m-4 p-2 rounded-lg bg-pink-100">등록한 거래글이 없습니다.</p>)}
        {posts.map((post, index) => (
          <AccordionDetails
            key={index}
            sx={{ margin: "auto" }}
          >
            <ProductCard product={post} next={`/lists/${post.id}`} />
          </AccordionDetails>
        ))}
        <AccordionActions
          sx={{
            margin: "15px auto 10px",
            display: "flex",
            justifyContent: "center",
            // width: "60%",
          }}
        >
          <Button onClick={handleCloseClick} variant="outlined">
            닫기
          </Button>
        </AccordionActions>
      </Accordion>
    </div>
  );
}