import { atomWithMutation } from "jotai-tanstack-query";
import { LoginDto } from "./dtos/login-dto";
import AuthRepository from "./auth-repository";
import { isLeft } from "fp-ts/lib/Either";
import { User } from "firebase/auth";
import { Failure } from "@/utils/failure";

export const loginAtom = atomWithMutation<User, LoginDto, Failure>(() => ({
  mutationKey: ["login"],
  mutationFn: async (values) => {
    const res = await AuthRepository.login(values.email, values.password);
    if (isLeft(res)) {
      throw res.left;
    } else {
      return res.right;
    }
  },
}));
