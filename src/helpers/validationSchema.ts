import * as Yup from "yup";

export const faqValidationSchema = Yup.object({
  question: Yup.string()
    .min(10, "minimum 10 characters required")
    .max(100, "maximum 100 characters only")
    .required("This field is required"),
  answer: Yup.string()
    .min(30, "minimum 30 characters required")
    .max(1000, "maximum 1000 characters only")
    .required("This field is required"),
});

export const teamsValidationSchema = Yup.object({
  name: Yup.string()
    .max(100, "maximum 100 characters only")
    .required("This field is required"),
  role: Yup.string()
    .max(100, "maximum 250 characters only")
    .required("This field is required"),
  avatar: Yup.string().required("This field is required"),
});

export const videoValidationSchema = Yup.object({
  title: Yup.string(),
  description: Yup.string(),
});

export const emailValidationSchemaa = Yup.object({
  primary_mail: Yup.string()
    .email("invalid email format")
    .required("This field is required"),
});

export const countdownValidationSchemaa = Yup.object({
  token_sale_countdown: Yup.date()
    .test("date_test", "date must be future date", (value) => {
      if (!value) return false;
      if (value.getTime() <= Date.now()) return false;
      return true;
    })
    .required("This field is required"),
});

export const announcementValidationSchemaa = Yup.object({
  title: Yup.string(),
  description: Yup.string(),
  image_url: Yup.string().required("This field is required"),
});

export const teamValidationSchemaa = Yup.object({
  display_team_section: Yup.boolean(),
});
