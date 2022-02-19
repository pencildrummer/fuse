import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import Page from 'components/page-layouts/Page'
import { Button, Form, Group, Input, Widget } from 'plugins/@fuse-labs/core-ui'

export default function MarketplacePage() {
  return (
    <Page>
      <div className='p-2'>
        <Widget title="Search">
          <Form initialValues={{ query: '' }}>
            <Group>
              <Input name="query" className="flex-1"/>
              <Button squared>
                <MagnifyingGlassIcon />
              </Button>
            </Group>
          </Form>
        </Widget>
      </div>
    </Page>
  )
}