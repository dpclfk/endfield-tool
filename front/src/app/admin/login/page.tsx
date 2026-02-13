import { Button } from "@/components/ui/button";
import { login } from "@/lib/login";
import { nanum_brush } from "@/style/fonts";
import Link from "next/link";
import LoginForm from "./login-form";

export default function Login() {
  // const inputClassName =
  //   "px-2 py-1 w-full bg-zinc-50 dark:bg-gray-800 text-end rounded-sm outline-none ring focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-700 dark:ring-gray-600";
  // const inputParentClassName =
  //   "rounded-sm mx-1 w-[80%] flex flex-col justify-end py-2 gap-2";

  // async function handleSubmit(formData: FormData) {
  //   const response = await login(formData);
  // }

  return (
    <div className="w-[50%] min-h-[calc(100vh-4rem)] mx-auto">
      <div className="w-full">
        <div
          className={`${nanum_brush.className} h-[6rem] flex justify-center items-center text-center`}
        >
          <Link className="text-6xl" href="/">
            엔드필드 tool
          </Link>
        </div>
      </div>
      {/* <form
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
      </form> */}
      <LoginForm />
    </div>
  );
}
