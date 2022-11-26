import BlockingView from '../BlockingView/BlockingView'
import Group from '../../shared/Group/Group'
import { LightningBoltIcon } from '@radix-ui/react-icons'

export default function InactivePluginView() {
  return (
    <BlockingView>
      <Group orientation='vertical' className="items-center">
        <LightningBoltIcon className='w-20 h-20 text-gray-700'/>
        <span className="font-bold text-gray-500">
          Plugin not active
        </span>
      </Group>
    </BlockingView>
  )
}