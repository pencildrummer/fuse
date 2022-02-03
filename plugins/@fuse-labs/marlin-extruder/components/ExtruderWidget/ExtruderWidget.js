import { ChevronLeftIcon, ChevronRightIcon, ReloadIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import { Button, Slider } from "plugins/@fuse-labs/core-ui";
import { useEffect, useState } from "react/cjs/react.development";
import { Widget } from "../../../core-ui";
import Label from "../../../core-ui/components/shared/Label/Label";
import Select from "../../../core-ui/components/shared/Select/Select";
import Separator from "../../../core-ui/components/shared/Separator/Separator";

export default function ExtruderWidget() {

  const [motor, setMotor] = useState()
  const [disabled, setDisabled] = useState()

  useEffect(_ => setDisabled(!motor), [motor])

  return (
    <Widget title="Extruder" version="0.1">

      <div className="flex flex-col space-y-1">
        <Label htmlFor="e-motor">
          Motor
        </Label>
        <Select id="e-motor" options={[
          { value: 'all', label: 'All motors' },
          { value: 'e1', label: 'Extruder 1' },
          { value: 'e2', label: 'Extruder 2' }
        ]} onChange={v => setMotor(v)} />
      </div>

      <Separator />
      
      <div className="flex flex-row space-x-2">
        <Button disabled={disabled}>
          <ChevronLeftIcon />
          <span>Retract</span>
        </Button>

        <Button disabled={disabled}>
          <span>Extrude</span>
          <ChevronRightIcon />
        </Button>
      </div>
 
      <div className="flex flex-col items-stretch space-y-1">
        <div className={classNames(
          'flex flex-row items-center justify-between text-sm',
          { 'opacity-30': disabled }
          )}>
          <span className="font-medium">
            Flow rate
          </span>
          <span className="font-mono text-xs">
            100%
          </span>
        </div>
        <div className="flex flex-row space-x-2">
          <Slider defaultValue={[50]} max={100} step={0.1} className="flex-1" disabled={disabled}/>  
          <Button squared disabled={disabled}>
            <ReloadIcon />
          </Button>
        </div>
      </div>
    </Widget>
  )
}