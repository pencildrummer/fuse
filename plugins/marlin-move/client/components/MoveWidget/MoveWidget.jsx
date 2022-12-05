import { useDeviceContext } from "@fuse-labs/core-client";
import {
  Widget,
  ToggleGroup,
  Group,
  Button,
  Separator,
  Cross2Icon,
  ExclamationTriangleIcon,
  HomeIcon,
  ThickArrowDownIcon,
  ThickArrowLeftIcon,
  ThickArrowRightIcon,
  ThickArrowUpIcon,
} from "@fuse-labs/core-ui";
import { useState } from "react";

/**
 * All the commands should be moved into each single listener on socket to be safer?
 */

function MoveButton({ ...props }) {
  return (
    <Button squared {...props}>
      {props.children}
    </Button>
  );
}

export default function MoveWidget() {
  const { device } = useDeviceContext();

  const [disabled, setDisabled] = useState(true);
  const [distanceInc, setDistanceInc] = useState("1");

  // This will be handled in a core lib
  function handleConnect() {
    device.terminal.connect((connected) => {
      console.log("Connected", connected);
      setDisabled(!connected);
    });
    // socket.emit('openDevice', device, (result) => {
    //   console.log('Result', result)
    // })
  }

  // This is specific for the move plugin
  // Maybe extends GCodeCapableDevice prototype to add move methods?
  function handleMove(direction) {
    // Validate distanceInc
    if (isNaN(distanceInc)) {
      return console.error("Distance is not a number", distanceInc);
    }

    // Force floating value to have dot instead of commas
    let normalizeDistanceString = distanceInc.toString().replace(",", ".");

    // Set relative positioning
    device.terminal.sendMessage("G91");
    // TODO - Should wait for command completion
    // Send position command
    let messageParts = ["G0"];
    switch (direction) {
      case "incX":
        messageParts.push(`X${distanceInc}`);
        break;
      case "decX":
        messageParts.push(`X-${distanceInc}`);
        break;
      case "incY":
        messageParts.push(`Y${distanceInc}`);
        break;
      case "decY":
        messageParts.push(`Y-${distanceInc}`);
        break;
      case "incZ":
        messageParts.push(`Z${distanceInc}`);
        break;
      case "decZ":
        messageParts.push(`Z-${distanceInc}`);
        break;
      default:
        return console.error("Unsupported direction:", direction);
    }

    let message = messageParts.join(" ");

    device.terminal.sendMessage(message);
    // socket.emit('move:x', 10, (res) => {
    //   console.log('Move result', res)
    // })
  }

  function handleHome(axis) {
    let message = "G28 R10";
    switch (axis) {
      case "x":
        message += " X";
        break;
      case "y":
        message += " Y";
        break;
      case "z":
        message += " Z";
        break;
    }
    device.terminal.sendMessage(message);
  }

  function handleEmergencyStop() {
    device.terminal.sendMessage("M112");
  }

  return (
    <Widget title="Manual position" version="0.1">
      <div>
        To be removed, just to test device connection and move
        <Button onClick={handleConnect}>Connect</Button>
      </div>
      <div className="flex flex-row space-x-6">
        <div className="grid grid-cols-3 grid-rows-3 gap-2">
          <div />
          <div>
            <MoveButton onClick={() => handleMove("decY")} disabled={disabled}>
              <ThickArrowUpIcon />
            </MoveButton>
          </div>
          <div />

          <div>
            <MoveButton onClick={() => handleMove("decX")} disabled={disabled}>
              <ThickArrowLeftIcon />
            </MoveButton>
          </div>
          <div>
            <div className="relative w-full h-full text-[10px] font-mono">
              <span className="absolute top-1/2 left-1/2 translate-x-[-8px] translate-y-[-12px]">
                X
              </span>
              <span className="absolute top-1/2 left-1/2 translate-x-[-1px] translate-y-[-8px]">
                /
              </span>
              <span className="absolute top-1/2 left-1/2 translate-x-[5px] translate-y-[-3px]">
                Y
              </span>
            </div>
          </div>
          <div>
            <MoveButton onClick={() => handleMove("incX")} disabled={disabled}>
              <ThickArrowRightIcon />
            </MoveButton>
          </div>

          <div />
          <div>
            <MoveButton onClick={() => handleMove("incY")} disabled={disabled}>
              <ThickArrowDownIcon />
            </MoveButton>
          </div>
          <div />
        </div>

        <div className="grid grid-cols-1 grid-rows-3 gap-2">
          <div>
            <MoveButton disabled={disabled} onClick={() => handleMove("incZ")}>
              <ThickArrowUpIcon />
            </MoveButton>
          </div>
          <div>
            <div className="relative w-full h-full text-[10px] font-mono">
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                Z
              </span>
            </div>
          </div>
          <div>
            <MoveButton disabled={disabled} onClick={() => handleMove("decZ")}>
              <ThickArrowDownIcon />
            </MoveButton>
          </div>
        </div>
      </div>

      <div>
        <ToggleGroup
          type="single"
          value={distanceInc}
          onValueChange={(v) => setDistanceInc(v)}
        >
          <ToggleGroup.Item value="0.1">0.1</ToggleGroup.Item>
          <ToggleGroup.Item value="1">1</ToggleGroup.Item>
          <ToggleGroup.Item value="10">10</ToggleGroup.Item>
          <ToggleGroup.Item value="100">100</ToggleGroup.Item>
        </ToggleGroup>
      </div>

      <Separator />

      <Group>
        <Button onClick={() => handleHome("x")} disabled={disabled}>
          <HomeIcon className="mr-1" />X
        </Button>
        <Button onClick={() => handleHome("y")} disabled={disabled}>
          <HomeIcon className="mr-1" />Y
        </Button>
        <Button onClick={() => handleHome("z")} disabled={disabled}>
          <HomeIcon className="mr-1" />Z
        </Button>
      </Group>

      <Button onClick={() => handleHome()} disabled={disabled}>
        <HomeIcon />
      </Button>

      <Separator />
      <Button
        className="w-full"
        onClick={() => device.terminal.sendMessage("M410")}
      >
        <Cross2Icon className="mr-1" /> Quick stop
      </Button>

      <Button
        className="w-full"
        onClick={() => device.terminal.sendMessage("M112")}
      >
        <ExclamationTriangleIcon className="mr-1" /> Emergency stop
      </Button>
    </Widget>
  );
}
