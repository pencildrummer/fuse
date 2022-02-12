import classNames from "classnames";
import { useField } from "formik";

export default function Input(props) {

  const [field, meta, helpers] = useField(props)

  return <InputRaw {...field} {...props} error={field.name && meta.error && meta.touched} />
}

// Raw input to be use outside Formik forms
export function InputRaw({
  error,
  ...props
}) {
  return <input {...props} className={classNames(
    'text-xs px-1.5',
    'h-[26px]',
    'rounded-md',
    'font-mono font-medium',
    'ring-transparent',
    'bg-gray-900 border border-gray-600 text-gray-300',
    'focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600',
    'disabled:select-none disabled:touch-none disabled:opacity-60 disabled:bg-gray-800',
    {
      'border-red-600 ring-1 ring-red-600': error
    },
    'transition-colors duration-150',
    props.className
  )} />
}