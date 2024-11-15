"use client";

import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import ReservationView from "./ReservationView";
import RequestView from "./RequestView";

const AdminBoardPageContent = () => {
  const searchParams = useSearchParams();

  const category = searchParams.get("category");

  return (
    <>
      {category === "reservation" && <ReservationView />}

      {category === "request" && <RequestView />}
    </>
  );
};

const AdminBoardPage = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <AdminBoardPageContent />
    </Suspense>
  );
};

export default AdminBoardPage;
