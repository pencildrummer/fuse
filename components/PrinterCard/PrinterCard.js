import { AdjustmentsIcon, ArrowSmRightIcon } from "@heroicons/react/solid";
import Link from "next/link";

export default function PrinterCard({ printer }) {
  return (
    <div className="rounded-box card bg-neutral h-80">
      <div className="card-body">
        <div className="flex-1">
          <div className="card-title">
            {printer.name}
          </div>
          <div className="text-xs">
            <div className="flex items-center">
              <div>
                <span className="badge badge-primary text-xs uppercase font-semibold">
                  CONNESSA
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="card-actions flex items-center">
          <div className="flex-1">
            <Link href={"/printers/"+printer.id+"/config"} passHref>
              <a className="btn btn-ghost btn-sm btn-square">
                <AdjustmentsIcon className="w-4 h-4" />
              </a>
            </Link>
          </div>
          <div className="flex-none">
            <Link href={"/printers/"+printer.id} passHref>
              <ArrowSmRightIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}