import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";
import classNames from "classnames";

// TODO: Move into core-ui, this now is shared from SettingPage dir components
export default function MenuItem({ href, strict = false, ...props }) {
  const router = useRouter();
  const active = useMemo(
    () => (strict ? router.asPath == href : router.asPath.startsWith(href)),
    [href, router.asPath]
  );

  return (
    <li
      className={classNames(
        "rounded-md text-sm font-medium",
        "transition-colors duration-150",
        {
          "hover:bg-gray-800 hover:bg-opacity-40": !active,
          "bg-blue-600": active,
        }
      )}
    >
      {href ? (
        <Link href={href} passHref>
          <a className="block px-2 py-1 w-full h-full">{props.children}</a>
        </Link>
      ) : (
        props.children
      )}
    </li>
  );
}
