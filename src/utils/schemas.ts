import Strings from "@/constants/strings";
import * as Yup from "yup";

export const EmailValidator = Yup.string()
  .email(Strings.fields.emailInvalid)
  .max(256, Strings.fields.emailInvalid);

export const PasswordValidator = Yup.string()
  .min(6, Strings.fields.passwordTooShort)
  .max(256, Strings.fields.passwordTooLong);

export const LoginSchema = Yup.object().shape({
  email: EmailValidator.required(Strings.fields.required),
  password: PasswordValidator.required(Strings.fields.required),
});
