import ScrollArea from "../../shared/ScrollArea/ScrollArea";
import MainLayout from "../../layouts/MainLayout/MainLayout";

export default function Page(props) {
  return (
    <MainLayout>
			<ScrollArea className="flex-1 h-full">
        <div className="flex flex-col space-y-2">
          {props.children}
        </div>
      </ScrollArea>
    </MainLayout>
  )
}