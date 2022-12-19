import { Formik, Form as FormikForm, FormikConfig, FormikValues } from "formik";
import React, { FormEvent, useEffect, useCallback } from "react";
import FormItem, { FormItemSpec } from "../../forms/FormItem";
import Button from "../Button/Button";
import Separator from "../Separator/Separator";

type FormProps<FormValues> = {
  disabled?: boolean;
  items?: FormItemSpec[];
  submitTitle?: string;
  onValueChange?: (field: string, value: any) => void;
  onValuesChange?: (FormValues) => void;
};

// TODO: Do something to disabled all controls inside Form is disabled is true, check Formik helpers
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

        useEffect(() => {
          console.log("Form disabled", props.disabled);
          if (props.disabled) {
            formikProps.setStatus("disabled");
          } else {
            formikProps.setStatus();
          }
        }, [props.disabled]);

        return (
          <FormikForm aria-disabled={props.disabled}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 py-3">
              {props.items?.length && renderItems(props.items)}
            </div>

            {typeof props.children === "function"
              ? props.children(formikProps)
              : props.children}

            {props.submitTitle && (
              <div>
                <Button type="submit" title={props.submitTitle} />
              </div>
            )}
          </FormikForm>
        );
      }}
    </Formik>
  );
}

// Render form items fn
function renderItems(items: FormItemSpec[]) {
  return items.map((item, i) => {
    if (item.type == "group") {
      return (
        <React.Fragment key={`group-${i}`}>
          {item.label && (
            <div className="col-span-full">
              <div className="text-lg font-medium">{item.label}</div>
            </div>
          )}
          <Separator className="col-span-full my-0" />
          {item.description && (
            <div className="col-span-full text-xs font-normal text-gray-400">
              {item.description}
            </div>
          )}
          <div className="col-span-full grid grid-cols-2 md:grid-cols-3 gap-3">
            {renderItems(item.fields)}
          </div>
          {item.notes && (
            <div className="col-span-full text-xs font-normal py-1.5 px-2 bg-gray-800 text-gray-500 rounded-md">
              {item.notes}
            </div>
          )}
          <Separator className="col-span-full my-0 mb-5" />
        </React.Fragment>
      );
    } else {
      return <FormItem key={item.name} item={item} orientation="horizontal" />;
    }
  });
}
