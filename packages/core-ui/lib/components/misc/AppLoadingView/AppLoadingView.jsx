import BlockingView from "../BlockingView/BlockingView";
import Loader from "../../shared/Loader/Loader";

export default function AppLoadingView() {
  return (
    <BlockingView>
      <div className="flex flex-col space-y-2">
        <div className="flex flex-row space-x-3 text-gray-300 items-center">
          <Loader size="xl" />
          <span className="font-semibold">Loading app data...</span>
        </div>
      </div>
    </BlockingView>
  );
}
