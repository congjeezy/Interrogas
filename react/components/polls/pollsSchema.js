import * as Yup from 'yup';

const insertSchema = Yup.object().shape({
  pollsterId: Yup.number().required("Is Required"),
  methodTypeId: Yup.number().required("Polling method is required"),
  dateTaken: Yup.string().required("Please record date poll was taken"),
  datePublished: Yup.string(),
  cost: Yup.number(),
  referenceId: Yup.number().required("Is Required"),
  objective: Yup.string().max(255),
  electionYear: Yup.number().required("Is Required"),
  pollContentId: Yup.number()
});

const updateSchema = Yup.object().shape({
  pollsterId: Yup.number().required("Is Required"),
  methodTypeId: Yup.number().required("Polling method is required"),
  dateTaken: Yup.string().required("Please record date poll was taken"),
  datePublished: Yup.string(),
  cost: Yup.number(),
  referenceId: Yup.number().required("Is Required"),
  objective: Yup.string().max(255),
  electionYear: Yup.number().required("Is Required"),
  pollContentId: Yup.number()
});

const searchSchema = Yup.object().shape({
  query: Yup.mixed(),
})

export { insertSchema, searchSchema, updateSchema };