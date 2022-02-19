import { Loader } from "plugins/@fuse-labs/core-ui";

export default function AppLoader() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col space-y-2">

        <div className="flex flex-row space-x-3 text-gray-300 items-center">
          <Loader size="xl" />
          <span className="font-semibold">
            Loading app data...
          </span>
        </div>
      </div>
    </div>
  )
}