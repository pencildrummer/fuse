import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";
import "date-fns";
import "chartjs-adapter-date-fns";
import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react";
import {
  useDeviceContext,
  ClientPrinterDeviceProfile,
  ClientPrinterDevice,
} from "@fuse-labs/core-client";
import {
  Button,
  Group,
  Label,
  Widget,
  InputRaw,
  ArrowRightIcon,
} from "@fuse-labs/core-ui";
import merge from "lodash/merge";

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Tooltip
);

const DEFAULT_DATA = {
  datasets: [
    {
      key: "bed",
      label: "Bed",
      borderColor: "#0891b2",
      data: [],
    },
    // TODO - Make dynamic extruder dataset based on device configuration
    {
      key: "extruder-0",
      label: "Extruder 0",
      borderColor: "#ec4899",
      data: [],
    },
    {
      key: "extruder-1",
      label: "Extruder 0",
      borderColor: "#be185d",
      data: [],
    },
    {
      key: "chamber",
      label: "Chamber",
      borderColor: "#0000ff",
      data: [],
    },
    {
      key: "ambient",
      label: "Ambient",
      borderColor: "#65a30d",
      data: [],
    },
  ],
};

export default function TemperatureWidget() {
  const { device } = useDeviceContext<ClientPrinterDevice>();

  const [data, setData] = useState({ datasets: [] });

  const [temperature, setTemperature] = useState({});
  const [userTargetTemperature, setUserTargetTemperature] = useState({});

  useEffect(() => {
    // Prepare default data
    // TODO - Check if bed is heated
    // TODO - Dynamic list of extruders
    // TODO - Check if can get ambient temperature?
    // TODO - Check if can get chamber temperature?
    if (device.profile instanceof ClientPrinterDeviceProfile) {
      // TODO: Use generics instead

      let printerProfile = device.profile as ClientPrinterDeviceProfile;

      let deviceTemperatureDatasets = [];

      // Populate extruders datasets
      printerProfile.extruders.forEach((extruder, i) => {
        deviceTemperatureDatasets.push({
          key: `extruder-${i}`,
          label: `Extruder ${i}`,
          data: [],
          borderColor: "#ff0000",
        });
      });

      if (printerProfile.bed.heated) {
        deviceTemperatureDatasets.push({
          key: "bed",
          label: "Bed",
          data: [],
          borderColor: "#ff5500",
        });
      }

      setData({
        datasets: deviceTemperatureDatasets,
      });
    }

    // Attach listeners
    let handleTemperatureData = (temperature) => {
      // Updated latest temperature state
      setTemperature((prevTemperature) =>
        merge({ ...prevTemperature }, temperature)
      );
      // Updated graph data
      setData((prevData) => {
        let data = { ...prevData };
        Object.keys(temperature).forEach((key) => {
          // Get dataset with key if any
          let dataset = data.datasets.find((d) => d.key == key);
          if (dataset) {
            // Add new current temperature to data
            if (temperature[key].current) {
              dataset.data.push({
                x: new Date().getTime(),
                y: temperature[key].current,
              });
            }
          } else {
            console.log("No dataset found for key:", key);
          }
        });
        return data;
      });
    };
    device.socket.on("data:temperature", handleTemperatureData);
    return (_) => device.socket.off("data:temperature", handleTemperatureData);
  }, [device]);

  function requestTargetHotend() {
    if (userTargetTemperature.hotend)
      device.socket.emit("nozzle:set", parseInt(userTargetTemperature.hotend));
  }

  function requestTargetBed() {
    if (userTargetTemperature.bed)
      device.socket.emit("heatbed:set", parseInt(userTargetTemperature.bed));
  }

  function setKeyTargetTemperature(key, value) {
    setUserTargetTemperature((t) => ({ ...t, [key]: value }));
  }

  let minDate = (() => {
    let date = new Date();
    date.setMinutes(date.getMinutes() - 1);
    return date.getTime();
  })();

  return (
    <Widget title="Temperature" version="0.1" className="col-span-3">
      <Line
        options={{
          responsive: true,
          //animation: false,
          datasets: {
            line: {
              tension: 0.6,
              cubicInterpolationMode: "monotone",
              borderWidth: 1,
              pointRadius: 0,
            },
          },
          interaction: {
            intersect: false,
          },
          plugins: {
            tooltip: {
              enabled: true,
            },
          },
          scales: {
            x: {
              type: "time",
              // parsing: false,
              time: {
                unit: "second",
              },
              grid: {
                display: false,
              },
              min: minDate,
              max: new Date().getTime(),
            },
            y: {
              suggestedMax: 150,
              suggestedMin: 0,
            },
          },
        }}
        datasetIdKey="key"
        data={data}
      />

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        <TemperatureField
          valueKey="extruder-0"
          label="Extruder 0"
          value={userTargetTemperature.hotend}
          onChange={(value) => setKeyTargetTemperature("extruder-0", value)}
          onSend={requestTargetHotend}
          currentActualValue={temperature?.["extruder-0"]?.current}
          currentTargetValue={temperature?.["extruder-0"]?.target}
        />

        {device.profile.bed.heated && (
          <TemperatureField
            valueKey="bed"
            label="Bed"
            value={userTargetTemperature.bed}
            onChange={(value) => setKeyTargetTemperature("bed", value)}
            onSend={requestTargetBed}
            currentActualValue={temperature?.bed?.current}
            currentTargetValue={temperature?.bed?.target}
          />
        )}

        <TemperatureField
          valueKey="ambient"
          label="Ambient"
          value={temperature?.ambient?.current}
          editable={false}
        />

        <TemperatureField
          valueKey="chamber"
          label="Chamber"
          value={temperature?.chamber?.current}
          editable={false}
        />
      </div>
    </Widget>
  );
}

function TemperatureField({
  valueKey,
  label = null,
  value,
  currentActualValue = null,
  currentTargetValue = null,
  onChange = null,
  onSend = null,
  editable = true,
  ...props
}) {
  function handleChange(e) {
    onChange?.(e.target.value);
  }

  return (
    <Group className="justify-start">
      <Label
        className="flex-1 truncate flex items-center space-x-2"
        htmlFor={`temperature-${valueKey}`}
      >
        <span>{label || valueKey}</span>
      </Label>
      {editable && (
        <>
          <InputRaw
            name={`temperature-${valueKey}`}
            value={value}
            onChange={handleChange}
            className="w-[60px] text-right"
            detailContent="°C"
          />
          <Button onClick={onSend} squared>
            <ArrowRightIcon />
          </Button>
        </>
      )}
      <InputRaw
        name={valueKey}
        disabled
        value={currentTargetValue}
        className="w-[60px] text-right"
        detailContent="°C"
      />
    </Group>
  );
}
