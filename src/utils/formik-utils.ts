import { FormikProps, FormikValues, getIn, useFormik } from "formik";

export function spreadField(
  formik: ReturnType<typeof useFormik> | FormikProps<FormikValues>,
  field: string
) {
  return {
    name: field,
    onChange: formik.handleChange,
    value: getIn(formik.values, field),
    error: !!getIn(formik.errors, field),
    helperText: formik.errors[field] && getIn(formik.errors, field),
  };
}
