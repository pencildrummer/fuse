/* eslint-disable @next/next/no-img-element */
import { Widget } from "@fuse-labs/core-ui";
import * as AspectRatio from '@radix-ui/react-aspect-ratio';

export default function CameraWidget({
  ...props
}) {
  return <Widget full>
    <AspectRatio.Root ratio={16/9}>
        <img src="https://unsplash.com/photos/HsefvbLbNWc/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjQzNzAyOTQ5&force=true&w=640"
          width="100%"
          alt=""
          className="object-cover w-full h-full" />
    </AspectRatio.Root>
  </Widget>
}