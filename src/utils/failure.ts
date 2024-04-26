import Strings from "@/constants/strings";
import { FirebaseError } from "firebase/app";

export enum FailureType {
  server = "server",
  client = "client",
  network = "network",
  parse = "parse",
  unknown = "unknown",
  loggedOut = "loggedOut",
  rateLimit = "rateLimit",
}

export class Failure {
  private constructor(
    private readonly type: FailureType,
    private readonly errors?: any
  ) {}

  static create(type: FailureType, errors?: any): Failure {
    return new Failure(type, errors);
  }

  static createFromFirebaseError(error: FirebaseError): Failure {
    switch (error.code) {
      case "auth/invalid-credential":
        return Failure.create(FailureType.client, [
          Strings.fields.emailPasswordMismatch,
        ]);
      default:
        return new Failure(FailureType.unknown, error.message);
    }
  }

  get message(): string {
    switch (this.type) {
      case FailureType.server:
        return "Server is unavailable, please try again.";
      case FailureType.client:
        return "Request is invalid, please try again.";
      case FailureType.network:
        return "Network not available, please try again.";
      case FailureType.parse:
        return "Unable to parse data, please try again.";
      case FailureType.loggedOut:
        return "You are logged out, please login and try again.";
      case FailureType.unknown:
        return "Something went wrong, please try again.";
      case FailureType.rateLimit:
        return "Too many requests, please try again later.";
      default:
        return "Something went wrong, please try again.";
    }
  }

  get errorList(): string[] {
    const list = Object.values(this.errors ?? {}).map((v) => `${v}`);
    if (list.length) return list;
    return [this.message];
  }

  get errorMap(): Record<string, string> {
    const map = {
      ...(this.errors ?? {}),
    };
    if (Object.keys(map).length) return map;
    return {
      [this.type.toString()]: this.message,
    };
  }
}
