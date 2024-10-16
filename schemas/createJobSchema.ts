import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

const createSchema = () => {
  const { t } = useI18n();

  return toTypedSchema(
    z.object({
      title: z
        .string({
          required_error: t("validation.required", [t("title")]),
        })
        .min(2, t("validation.minCharacters", [t("title"), "2"]))
        .max(50, t("validation.maxCharacters", [t("title"), "50"])),
      location: z
        .string({
          required_error: t("validation.selectboxError", [t("location")]),
        })
        .min(1, t("validation.minCharacters", [t("location"), "1"])),
      estimatedJobTime: z
        .string({
          required_error: t("validation.selectboxError", [
            t("estimatedJobTime"),
          ]),
        })
        .min(1, t("validation.minCharacters", [t("estimatedJobTime"), "1"])),
      description: z
        .string({
          required_error: t("validation.required", [t("description")]),
        })
        .min(20, t("validation.minCharacters", [t("description"), "20"])),
    })
  );
};

export const formSchema = createSchema;
