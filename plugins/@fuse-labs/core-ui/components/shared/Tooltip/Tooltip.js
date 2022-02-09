import * as TooltipPrimitive from '@radix-ui/react-tooltip'

export default function Tooltip({
  showArrow = false,
  delayDuration = 150,
  content,
  ...props
}) {
  return (
    <TooltipPrimitive.Root delayDuration={delayDuration}>
      <TooltipPrimitive.Trigger asChild>
        {props.children}
      </TooltipPrimitive.Trigger>
      <TooltipPrimitive.Content {...props}
        className='bg-gray-700 text-gray-100 font-bold text-xs rounded-md p-2 shadow-sm'>
        {showArrow && <TooltipPrimitive.Arrow />}
        {content}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Root>
  )
}