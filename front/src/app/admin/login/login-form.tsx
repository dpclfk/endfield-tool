"use client";

import { Button } from "@/components/ui/button";
import { login } from "@/lib/login";

export default function LoginForm() {
  const inputClassName =
    "px-2 py-1 w-full bg-zinc-50 dark:bg-gray-800 text-end rounded-sm outline-none ring focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-700 dark:ring-gray-600";
  const inputParentClassName =
    "rounded-sm mx-1 w-[80%] flex flex-col justify-end py-2 gap-2";

  async function handleSubmit(formData: FormData) {
    const response = await login(formData);

    // console.log(response.status);
    if (response.status === "fail") {
      alert(response.message);
    } else {
    }
    // alert(response.status);
  }

  return (
    <form
      className="bg-zinc-50 dark:bg-gray-700 w-full flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]"
      action={handleSubmit}
    >
      <div className="w-[80%] border-b-2 pb-4">
        <p className="text-4xl"> Sign In</p>
      </div>
      <div className={`${inputParentClassName}`}>
        <div>
          <p className="text-2xl">email</p>
        </div>
        <input
          className={`${inputClassName}`}
          type="email"
          placeholder="이메일을 입력해주세요."
          name="email"
        />
      </div>
      <div className={`${inputParentClassName}`}>
        <div>
          <p className="text-2xl">password</p>
        </div>
        <input
          className={`${inputClassName}`}
          type="password"
          placeholder="비밀번호를 입력해주세요."
          name="password"
        />
      </div>
      <div className="py-4 w-[80%]">
        <Button className="w-full" type="submit">
          로그인
        </Button>
      </div>
    </form>
  );
}
