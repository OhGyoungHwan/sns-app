"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function useSubmit(apiUrl: string, method: string) {
  // 데이터
  const router = useRouter();
  // 계산
  // 액션
  const submitData = async (body: { [key: string]: string }) => {
    try {
      await fetch(apiUrl, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      router.push("/");
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  return { submitData };
}
