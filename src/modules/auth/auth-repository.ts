import { Failure, FailureType } from "@/commons/value-objects/failure";
import { User, signInWithEmailAndPassword } from "firebase/auth";
import { Either } from "fp-ts/lib/Either";
import { either } from "fp-ts";
import { firebaseAuth } from "@/configs/firebase";
import { FirebaseError } from "firebase/app";

export default class AuthRepository {
  static async login(
    email: string,
    password: string
  ): Promise<Either<Failure, User>> {
    try {
      const res = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      return either.right(res.user);
    } catch (error) {
      const failure = Failure.createFromFirebaseError(error as FirebaseError);
      return either.left(failure);
    }
  }
}
