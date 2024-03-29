import React, { Suspense } from "react";
import styles from "@/components/my-page/my-detail.module.scss";
import TopBar2 from "@/components/my-page/my-page-profile";
import MyInfoEditor from "@/components/my-page/my-profile/my-profile-edit";
import MyInfoSummary from "@/components/my-page/my-profile/my-profile-summary";

export default async function MyProfileDetail() {
  return (
    <div className={styles.container}>
      <TopBar2 />
      <Suspense fallback={<div>Loading...</div>}>
        <MyInfoSummary />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <MyInfoEditor />
      </Suspense>
    </div>
  );
}
