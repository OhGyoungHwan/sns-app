"use client";
import { useRouter } from "next/navigation";
import useLoading from "./useLoading";
import { useState } from "react";

export default function useSubmit(
  apiUrl: string,
  method: string,
  href: string
) {
  // 데이터
  const router = useRouter();
  const { setIsOnLoading } = useLoading();
  const [isError, setIsError] = useState(false);
  // 계산
  // 액션
  const submitData = async (body: { [key: string]: string | number }) => {
    setIsOnLoading(true);
    try {
      await fetch(apiUrl, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setIsError(false);
      setIsOnLoading(false);
      router.push(href);
    } catch (error) {
      console.error(error);
      setIsError(true);
      setIsOnLoading(false);
      alert(error);
    }
  };

  return { submitData, isError };
}
