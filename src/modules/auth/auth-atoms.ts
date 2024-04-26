import { Failure } from "@/commons/value-objects/failure";
import { firebaseAuth } from "@/configs/firebase";
import { User, onAuthStateChanged } from "firebase/auth";
import { isLeft } from "fp-ts/lib/Either";
import { atom } from "jotai";
import { atomWithMutation } from "jotai-tanstack-query";
import AuthRepository from "./auth-repository";
import { LoginDto } from "./dtos/login-dto";

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

export const loggedInUserAtom = atom<User | null>(firebaseAuth.currentUser);
loggedInUserAtom.onMount = (setAtom) => {
  const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
    setAtom(user);
  });
  return () => {
    unsubscribe();
  };
};
