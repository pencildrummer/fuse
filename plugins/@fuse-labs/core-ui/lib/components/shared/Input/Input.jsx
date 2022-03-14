import { Label } from "@radix-ui/react-label";
import classNames from "classnames";
import { useField } from "formik";

export default function Input(props) {

  const [field, meta, helpers] = useField(props)

  return <InputRaw {...field} {...props}
    error={field.name && meta.error && meta.touched}
    dirty={meta.touched && !meta.error && meta.value != meta.initialValue} />
}

// Raw input to be use outside Formik forms
export function InputRaw({
  error,
  dirty,
  detailContent,
  ...props
}) {
  // Return barebone input if hidden type, no need for div or other wrappers
  // Add hidden attribute, to allow Tailwindcss to work also
  if (props.type == 'hidden') {
    return <input {...props} hidden/>
  }

  return (
    <div className={classNames(
      'flex flex-row items-center',
      'rounded-md overflow-hidden flex-shrink-0',
      'h-[26px]',
      'font-mono font-medium',
      'bg-gray-900 border border-gray-600 text-gray-300',
      'focus-within:border-blue-600 focus-within:outline-none focus-within:ring-1 focus-within:ring-blue-600',
      {
        'border-red-600 ring-1 ring-red-600': error,
        'border-yellow-500 ring-1 ring-yellow-500': !error && dirty,
      },
      props.className
    )}>
      <input {...props} className={classNames(
        'text-xs px-1.5',
        'h-full min-w-0 w-full',
        'ring-0 outline-none',
        'bg-gray-900 text-gray-300',
        'disabled:select-none disabled:touch-none disabled:opacity-60 disabled:bg-gray-800',
        'transition-colors duration-150',
      )} style={{
        textAlign: 'inherit'
      }}/>
      {detailContent && <Label htmlFor={props.id} className="flex-none select-none cursor-default text-xs bg-white/10 border-l border-gray-600 self-stretch flex items-center px-1">
        {detailContent}
      </Label>}
    </div>
  )
}