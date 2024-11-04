"use client";

import Form from "@/components/common/form";
import {
  ReservationFormProps,
  ReservationStatus,
  ServerReservationProps,
} from "@/types/reservation";
import { seperateIsostring } from "@/utils/reservation";
import React, { useCallback, useMemo, useState } from "react";
import DateTimeUI from "./DateTimeUI";
import Button from "../button";
import useReservation from "./useReservation";
import { useAuth } from "@/components/common/AuthContext";
import { RESERVATION_STATUS } from "@/constant";
import Badge from "@/components/common/badge";
import UpperFormList from "./side-components/UpperFormList";

const ReservationForm = ({
  formInfo = {
    id: 0,
    link: "",
    adults: 0,
    kids: 0,
    primaryDateTime: "",
    secondaryDateTime: "",
    tertiaryDateTime: "",
    status: "WAITING" as ReservationStatus,
  },
  controlable = false,
  nth = 1,
}: ReservationFormProps) => {
  const initialInfo = useMemo(() => {
    return {
      ...formInfo,
      pDate: seperateIsostring(formInfo?.primaryDateTime).date,
      pTime: seperateIsostring(formInfo?.primaryDateTime).time,
      sDate: seperateIsostring(formInfo?.secondaryDateTime).date,
      sTime: seperateIsostring(formInfo?.secondaryDateTime).time,
      tDate: seperateIsostring(formInfo?.tertiaryDateTime).date,
      tTime: seperateIsostring(formInfo?.tertiaryDateTime).time,
    };
  }, [formInfo]);

  const { isAuthenticated } = useAuth();
  const { createReservation } = useReservation();
  const [formData, setFormData] = useState(initialInfo);
  const {
    link,
    adults,
    kids,
    pDate,
    pTime,
    sDate,
    sTime,
    tDate,
    tTime,
    status,
  } = formData;

  const isControllable = useMemo(
    (): boolean => isAuthenticated && controlable,
    [isAuthenticated, controlable]
  );

  // const handleChange = useCallback((field: string) => {
  //   return (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const { value } = e.target;

  //     setFormData((prevState) => {
  //       return {
  //         ...prevState,
  //         [field]: value,
  //       };
  //     });
  //   };
  // }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  console.log(formData);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const data: ServerReservationProps = {
        restaurant_link: link,
        adult_count: adults,
        child_count: kids,
        primary_date_time: pDate + "T" + pTime + ":00",
        ...(sDate && sTime
          ? { secondary_date_time: sDate + "T" + sTime + ":00" }
          : {}),
        // tDate와 tTime이 있는 경우에만 추가
        ...(tDate && tTime
          ? { tertiary_date_time: tDate + "T" + tTime + ":00" }
          : {}),
      };

      createReservation(data);
    },
    [
      link,
      adults,
      kids,
      pDate,
      pTime,
      sDate,
      sTime,
      tDate,
      tTime,
      createReservation,
    ]
  );

  const dateTimeFields: Array<{
    date: string;
    time: string;
    dateField: string;
    timeField: string;
  }> = [
    {
      date: pDate,
      time: pTime,
      dateField: "pDate",
      timeField: "pTime",
    },
    {
      date: sDate,
      time: sTime,
      dateField: "sDate",
      timeField: "sTime",
    },
    {
      date: tDate,
      time: tTime,
      dateField: "tDate",
      timeField: "tTime",
    },
  ];

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Header>
        <p className="font-bold">{`${nth} 번째 예약`}</p>
        {!controlable && (
          <Badge isRadius>{RESERVATION_STATUS[status || "WAITING"]}</Badge>
        )}
      </Form.Header>
      <UpperFormList
        fieldInfo={{
          link: link,
          adults: adults,
          kids: kids,
          isControllable: isControllable,
        }}
        handleChange={handleChange}
      />
      <hr className="border-[#DDDDDD] my-4" />
      {/* {dateTimeFields
        .filter((obj) => {
          return isControllable || (!isControllable && obj.date);
        })
        .map((field, idx) => {
          return (
            <DateTimeUI
              key={`date-time-array-${idx}`}
              date={field.date}
              time={field.time}
              onDateChange={handleChange(field.dateField)}
              onTimeChange={handleChange(field.timeField)}
              disabled={!isControllable}
            />
          );
        })} */}
      {isControllable && (
        <Button color="primary" size="sm" isRadius type="submit">
          예약하기
        </Button>
      )}
    </Form>
  );
};

export default ReservationForm;
