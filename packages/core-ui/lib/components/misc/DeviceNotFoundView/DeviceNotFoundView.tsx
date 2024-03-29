import Group from "../../shared/Group/Group";
import BlockingView from "../BlockingView/BlockingView";
import Button from "../../shared/Button/Button";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function DeviceNotFoundView() {
  return (
    <BlockingView>
      <Group orientation="vertical" className="items-center">
        <QuestionMarkCircledIcon className="w-20 h-20 text-gray-400" />
        <span className="font-bold text-gray-500">Device not found</span>

        <span className="pt-10" />

        <Link href="/workspace">
          <Button>Go to workspace</Button>
        </Link>
      </Group>
    </BlockingView>
  );
}
