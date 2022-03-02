import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Page, Button, Form, Group, Input, Widget } from '@fuse-labs/core-ui'

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