import { LightningBoltIcon } from "@fuse-labs/core-ui";

export default function AppConnectingView() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col space-y-2">
        <div className="flex flex-row space-x-3 text-gray-300 items-center">
          <LightningBoltIcon className="w-5 h-5 animate-pulse" />
          <span className="font-semibold">Connecting...</span>
        </div>
      </div>
    </div>
  );
}
