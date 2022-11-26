import { CubeIcon } from "@fuse-labs/core-ui";

export default function AppLoadingView() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col space-y-2">
        <div className="flex flex-row space-x-3 text-gray-300 items-center">
          <CubeIcon className="w-5 h-5" />
          <span className="font-semibold">Loading app data...</span>
        </div>
      </div>
    </div>
  );
}
