import { Formik, Form as FormikForm, FormikConfig, FormikValues } from "formik";
import { FormEvent, useEffect, useCallback } from "react";

type FormProps<FormValues> = {
  onValueChange?: (field: string, value: any) => void;
  onValuesChange?: (FormValues) => void;
};

export default function Form<FormValues extends FormikValues>(
  props: FormikConfig<FormValues> & FormProps<FormValues>
) {
  return (
    <Formik {...props}>
      {(formikProps) => {
        // Listen values changes or override handleChange and trigger custom listener?
        useEffect(() => {
          props.onValuesChange?.(formikProps.values);
        }, [formikProps.values]);

        return (
          <FormikForm>
            {typeof props.children === "function"
              ? props.children(formikProps)
              : props.children}
          </FormikForm>
        );
      }}
    </Formik>
  );
}
