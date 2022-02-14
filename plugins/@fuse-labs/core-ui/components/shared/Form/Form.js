import { Formik, Form as FormikBaseForm } from 'formik'

export default function Form({
  children,
  ...props
}) {
  return <Formik {...props}>{ (formikProps) => (
    <FormikBaseForm className={props.className}>
      {typeof children === 'function' ? children(formikProps) : children}
    </FormikBaseForm>
  )}</Formik>
}