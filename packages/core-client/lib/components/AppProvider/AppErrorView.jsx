import {
  ExclamationTriangleIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";

export default function AppErrorView({ error }) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col space-y-2">
        <div className="flex flex-col space-y-3 text-gray-300 items-center text-xl">
          <ExclamationTriangleIcon className="w-10 h-10" />
          <span className="font-semibold">Something's wrong</span>

          <div className="bg-gray-700 text-gray-400 text-sm rounded-md px-2 py-1.5 flex flex-row space-x-3 items-center">
            <span>{error.message}</span>
            <QuestionMarkCircledIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
