import BlockingView from '../BlockingView/BlockingView.js'
import Loader from '../../shared/Loader/Loader.js'

export default function AppLoader() {
  return (
    <BlockingView>
      <div className="flex flex-col space-y-2">

        <div className="flex flex-row space-x-3 text-gray-300 items-center">
          <Loader size="xl" />
          <span className="font-semibold">
            Loading app data...
          </span>
        </div>
      </div>
    </BlockingView>
  )
}