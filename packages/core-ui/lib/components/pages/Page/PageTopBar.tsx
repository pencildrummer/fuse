export default function PageTopBar(props) {
  return (
    <div className="h-10 flex flex-row space-x-2 items-center text-gray-50 font-medium text-sm mx-1.5 px-1.5 py-2 border-b border-gray-700 z-20">
      {props.children}
    </div>
  );
}
