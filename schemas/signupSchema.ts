import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useI18n } from "#imports";

const createSchema = () => {
  const { t } = useI18n();

  return toTypedSchema(
    z
      .object({
        firstname: z
          .string({
            required_error: t("validation.required", [t("firstName")]),
          })
          .min(2, t("validation.minCharacters", [t("firstName"), "2"]))
          .max(20, t("validation.maxCharacters", [t("firstName"), "20"])),
        lastname: z
          .string({
            required_error: t("validation.required", [t("lastName")]),
          })
          .min(2, t("validation.minCharacters", [t("lastName"), "2"]))
          .max(20, t("validation.maxCharacters", [t("lastName"), "20"])),
        email: z
          .string({
            required_error: t("validation.required", [t("email")]),
          })
          .email(t("validation.invalidEmail"))
          .min(1, t("validation.required", t("email"))),
        password: z
          .string({
            required_error: t("validation.required", [t("password")]),
          })
          .min(6, t("validation.minCharacters", [t("password"), "6"])),
        repassword: z
          .string({
            required_error: t("validation.required", [t("repassword")]),
          })
          .min(6, t("validation.minCharacters", [t("repassword"), "6"])),
      })
      .refine((data) => data.password === data.repassword, {
        message: t("validation.passwordDontMatch"),
        path: ["repassword"],
      })
  );
};

export const formSchema = createSchema;
