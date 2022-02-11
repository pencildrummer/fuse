import { Formik, Form as FormikBaseForm } from 'formik'

export default function Form({
  children,
  ...props
}) {
  return <Formik {...props}>
    <FormikBaseForm>
      {children}
    </FormikBaseForm>
  </Formik>
}