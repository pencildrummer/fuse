import {
  ExclamationTriangleIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";
import { Button } from "@fuse-labs/core-ui";
import { useState } from "react";

type Props = {
  error: Error;
  onRefresh: () => Promise<any>;
};

export default function AppErrorView({ error, onRefresh }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  function handleRetry() {
    setIsLoading(true);
    console.log("Retrying");
    onRefresh()
      .then((res) => console.log("RES", res))
      .catch((err) => console.log("Error"))
      .finally(() => setIsLoading(false));
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col space-y-2">
        <div className="flex flex-col space-y-3 text-gray-300 items-center text-xl">
          <ExclamationTriangleIcon className="w-10 h-10" />
          <span className="font-semibold">Something's wrong</span>

          <div className="bg-gray-900 text-gray-600 text-xs rounded-md px-2 py-1.5 flex flex-row space-x-3 items-center">
            <span>{error.message}</span>
            <QuestionMarkCircledIcon />
          </div>

          <div>
            <Button
              onClick={onRefresh ? handleRetry : undefined}
              loading={isLoading}
            >
              Retry
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
