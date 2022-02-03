import ScrollArea from "../../plugins/@fuse-labs/core-ui/components/shared/ScrollArea/ScrollArea";
import MainLayout from "../layouts/MainLayout";

export default function Page(props) {
  return (
    <MainLayout>
			<ScrollArea className="flex-1 h-full">
        <div className="p-3 flex flex-col space-y-3">
          {props.children}
        </div>
      </ScrollArea>
    </MainLayout>
  )
}