"use client";
import { useRouter } from "next/navigation";

export default function useSubmit(
  apiUrl: string,
  method: string,
  href: string
) {
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
      router.push(href);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  return { submitData };
}
