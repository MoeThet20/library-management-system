"use client";

import React, { useEffect, useState } from "react";
import { Layout } from "@/components/common";
import Stack from "@mui/material/Stack";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { Button, Link, Typography } from "@mui/material";
import { getDashboardData } from "@/services/dashboard.service";
import {
  BOOK_LIST,
  BORROW_CREATE,
  BORROW_LIST,
  CATEGORY_LIST,
  RETURN_CREATE,
  STUDENT_LIST,
  TEACHER_LIST,
} from "@/const/routes";

type InfoType = {
  totalTeacher: number;
  totalStudent: number;
  totalBook: number;
  totalBorrow: number;
  totalCategory: number;
};

const ZERO = 0;

function Dashboard() {
  const [dashboardInfo, setDashboardInfo] = useState<InfoType | null>(null);

  useEffect(() => {
    getDashboardInfo();
  }, []);

  const getDashboardInfo = async () => {
    const res = await getDashboardData();
    setDashboardInfo(res);
  };

  const changeChartColor = (color: string) => ({
    [`& .${gaugeClasses.valueArc}`]: {
      fill: color,
    },
  });

  return (
    <Layout>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: 1, md: 3 }}
        justifyContent="center"
      >
        <div className="flex flex-col items-center">
          <Typography variant="h4">Teachers</Typography>
          <Link href={TEACHER_LIST}>
            <Gauge
              width={200}
              height={200}
              value={dashboardInfo?.totalTeacher || ZERO}
              sx={() => changeChartColor("#6255a9")}
            />
          </Link>
        </div>
        <div className="flex flex-col items-center">
          <Typography variant="h4">Students</Typography>
          <Link href={STUDENT_LIST}>
            <Gauge
              width={200}
              height={200}
              value={dashboardInfo?.totalStudent || ZERO}
              sx={() => changeChartColor("#3444a9")}
            />
          </Link>
        </div>
        <div className="flex flex-col items-center">
          <Typography variant="h4">Books</Typography>
          <Link href={BOOK_LIST}>
            <Gauge
              width={200}
              height={200}
              value={dashboardInfo?.totalBook || ZERO}
              sx={() => changeChartColor("#3a9288")}
            />
          </Link>
        </div>
        <div className="flex flex-col items-center">
          <Typography variant="h4">Category</Typography>
          <Link href={CATEGORY_LIST}>
            <Gauge
              width={200}
              height={200}
              value={dashboardInfo?.totalCategory || ZERO}
              sx={() => changeChartColor("#3186a2")}
            />
          </Link>
        </div>
        <div className="flex flex-col items-center">
          <Typography variant="h4">Borrows</Typography>
          <Link href={BORROW_LIST}>
            <Gauge
              width={200}
              height={200}
              value={dashboardInfo?.totalBorrow || ZERO}
              sx={() => changeChartColor("#2a77a5")}
            />
          </Link>
        </div>
      </Stack>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: 1, md: 3 }}
        justifyContent="center"
        sx={{ marginTop: 5 }}
      >
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, maxWidth: "30%", marginLeft: 10 }}
          href={BORROW_CREATE}
        >
          Borrow Books
        </Button>
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, maxWidth: "30%", marginLeft: 10 }}
          href={RETURN_CREATE}
        >
          Return Books
        </Button>
      </Stack>
    </Layout>
  );
}

export default Dashboard;
