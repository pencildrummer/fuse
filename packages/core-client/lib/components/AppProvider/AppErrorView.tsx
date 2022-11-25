import {
  ExclamationTriangleIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";
import { Button } from "@fuse-labs/core-ui";
import useAppContext from "../../hooks/useAppContext";
import AppError from "../../errors/AppError";
import AppConnectionError from "../../errors/AppConnectionError";
import AppDataError from "../../errors/AppDataError";

type Props = {
  error: AppError;
};

export default function AppErrorView({ error }: Props) {
  const { connect, requestAppData, connecting, loading } = useAppContext();

  function handleRetryConnect() {
    console.log("Retrying connecting...");
    connect();
  }

  function handleRetryRequestAppData() {
    console.log("Retrying requetsing app data...");
    requestAppData();
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
            {error instanceof AppConnectionError && (
              <Button
                onClick={handleRetryConnect}
                loading={connecting}
                disabled={connecting}
              >
                {connecting ? "Reconneting..." : "Reconnect"}
              </Button>
            )}

            {error instanceof AppDataError && (
              <Button
                onClick={handleRetryRequestAppData}
                loading={loading}
                disabled={loading}
              >
                {loading ? "Retrying..." : "Retry"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
