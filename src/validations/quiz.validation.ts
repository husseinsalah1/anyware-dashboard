import * as Yup from "yup";

export const UpdateQuizSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  subject: Yup.string().required("Required"),
  semester: Yup.string().required("Required"),
  totalMarks: Yup.number()
    .required("Required")
    .min(0, "Must be greater than or equal to 0"),
  questions: Yup.array().of(
    Yup.object().shape({
      question: Yup.string().required("Required"),
      options: Yup.array()
        .of(Yup.string().required("Required"))
        .min(1, "At least one option is required"),
      correctAnswer: Yup.string().required("Required"),
    })
  ),
});

export const AddQuizSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  subject: Yup.string().required("Required"),
  semester: Yup.string().required("Required"),
  totalMarks: Yup.number()
    .required("Required")
    .min(0, "Must be greater than or equal to 0"),
  questions: Yup.array().of(
    Yup.object().shape({
      question: Yup.string().required("Required"),
      options: Yup.array()
        .of(Yup.string().required("Required"))
        .min(1, "At least one option is required"),
      correctAnswer: Yup.string().required("Required"),
    })
  ),
});
