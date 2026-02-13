"use server";

import z from "zod";
import serverbase from "./server";
import { HTTPError } from "ky";

export type Login = {
  email: string;
  password: string;
};

export type AccessToken = {
  status: "success";
  access_token: string;
};

export type Fail = {
  status: "fail";
  message: string;
};

export async function login(formData: FormData): Promise<AccessToken | Fail> {
  const rawData = Object.fromEntries(formData.entries());

  const loginSchema = z.object({
    email: z
      .email("올바른 이메일 형식이 아닙니다")
      .min(5, "이메일이 너무 짧습니다"),
    password: z
      .string()
      .min(8, "비밀번호는 최소 8자 이상으로 입력해주세요.")
      .regex(/[a-z]/, "소문자를 포함해야 합니다.")
      .regex(/[0-9]/, "숫자를 포함해야 합니다.")
      .regex(/[!@#$%^&*(),.?":{}|<>]/, "특수문자를 포함해야 합니다."),
  });

  try {
    const validatedData = loginSchema.parse(rawData);
    const response = await serverbase
      .post("auth/login", { json: { validatedData } })
      .json<AccessToken>();
    return response;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errMessage = error.issues[0]?.message;
      console.log(errMessage);
      return {
        status: "fail",
        message: errMessage,
      };
    } else if (error instanceof HTTPError) {
      const serverMessage = await error.response?.json().catch(() => ({}));
      console.error("API 에러:", serverMessage.message);
      return {
        status: "fail",
        message: serverMessage.message,
      };
    } else {
      console.error("예상하지 못한 에러:", error);
      return {
        status: "fail",
        message: "실패",
      };
    }
  }
}
