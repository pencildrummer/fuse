import {
  Button,
  Popover,
  Progress,
  EmptyView,
  useDeviceStatusListContext,
} from "@fuse-labs/core-ui";
import {
  LayersIcon,
  PauseIcon,
  StopIcon,
  PlayIcon,
} from "@radix-ui/react-icons";
import { useAppContext, useDeviceContext } from "@fuse-labs/core-client";
import { useEffect, useState } from "react";

export default function MarlinJobQueueHandler() {
  const { isElectron } = useAppContext();
  const { device } = useDeviceContext();
  const { addStatus, removeStatus } = useDeviceStatusListContext();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if (!device.pluginSockets.fuseLabs.marlinCore) {
      return console.warn("Unexpected missing fuseLabs.marlinCore socket");
    }
    // Retrieve jobs
    device.pluginSockets.fuseLabs.marlinCore.emit("queue:jobs", (jobs) => {
      console.log("List of jobs", jobs);
      setJobs(jobs);
    });
  }, [device]);

  useEffect(() => {
    const handleJobAdded = (job) => {
      setJobs((jobs) => [...jobs, job]);
      addStatus(`Added job "${job.name}"`);
    };

    const handleJobRemoved = (job) => {
      setJobs((jobs) => jobs.filter((j) => j.id != job.id));
      addStatus(`Removed job "${job.name}"`);
    };

    const handleJobStart = (job) => {
      addStatus(`Started job "${job.name}"`);
    };

    const handleJobPause = (job) => {
      addStatus(`Paused job "${job.name}"`, { type: "warning" });
    };

    const handleJobResume = (job) => {
      addStatus(`Resumed job "${job.name}"`);
    };

    const handleJobProgress = (job) => {
      setJobs((jobs) => {
        let newJobs = [...jobs];
        let jobIndex = newJobs.findIndex((j) => j.id === job.id);
        if (jobIndex > -1) {
          newJobs.splice(jobIndex, 1, job);
        } else {
          console.warn("Received progress update for a job not in the queue");
        }
        return newJobs;
      });
    };

    const handleJobFinish = (job) => {
      setJobs((jobs) => jobs.filter((j) => j.id !== job.id));

      let status = addStatus(`Finished job "${job.name}"`, {
        type: "success",
      });
      setTimeout(() => removeStatus(status.id), 1500);

      if (isElectron()) {
        let notification = new Notification(device.name, {
          body: `${job.name} has been completed`,
        });
        notification.onclick = () => console.log("Clicked notification");
      }
    };

    device.socket.on("job:added", handleJobAdded);
    device.socket.on("job:removed", handleJobRemoved);
    device.socket.on("job:start", handleJobStart);
    device.socket.on("job:pause", handleJobPause);
    device.socket.on("job:resume", handleJobResume);
    device.socket.on("job:progress", handleJobProgress);
    device.socket.on("job:finish", handleJobFinish);
    return () => {
      device.socket.off("job:added", handleJobAdded);
      device.socket.off("job:removed", handleJobRemoved);
      device.socket.off("job:start", handleJobStart);
      device.socket.off("job:pause", handleJobPause);
      device.socket.off("job:resume", handleJobResume);
      device.socket.off("job:progress", handleJobProgress);
      device.socket.off("job:finish", handleJobFinish);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [device]);

  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button size="sm" mode="ghost" squared>
          <LayersIcon />
        </Button>
      </Popover.Trigger>
      <Popover.Content align="end">
        <JobList jobs={jobs} />
      </Popover.Content>
    </Popover.Root>
  );
}

function JobList({ jobs }) {
  return (
    <ul className="p-1 divide-y divide-gray-600">
      <li className="leading-none flex items-center pb-1.5">
        <span className="font-syncopate text-xxs leading-none uppercase">
          Jobs
        </span>
      </li>
      {jobs?.length ? (
        jobs?.map((job) => <JobListItem key={`job-${job.id}`} job={job} />)
      ) : (
        <li className="pt-5 pb-4 text-xs text-gray-500">
          <EmptyView text="No jobs in the queue" />
        </li>
      )}
    </ul>
  );
}

function JobListItem({ job }) {
  const { device } = useDeviceContext();

  function handleStart() {
    if (!device.pluginSockets.fuseLabs.marlinCore) {
      return console.warn("Unexpected missing fuseLabs.marlinCore socket");
    }
    // Handle start or resume on backend
    device.pluginSockets.fuseLabs.marlinCore.emit(
      "job:start",
      job.id,
      (res) => {
        console.log("Handle start res:", res);
      }
    );
  }

  function handlePause() {
    if (!device.pluginSockets.fuseLabs.marlinCore) {
      return console.warn("Unexpected missing fuseLabs.marlinCore socket");
    }
    device.pluginSockets.fuseLabs.marlinCore.emit(
      "job:pause",
      job.id,
      (res) => {
        console.log("Handle pause res:", res);
      }
    );
  }

  function handleStop() {
    if (!device.pluginSockets.fuseLabs.marlinCore) {
      return console.warn("Unexpected missing fuseLabs.marlinCore socket");
    }
    device.pluginSockets.fuseLabs.marlinCore.emit("job:stop", job.id, (res) => {
      console.log("Handle stop res:", res);
    });
  }

  return (
    <li className="flex flex-col max-w-[200px] pb-2 last:pb-0">
      <div className="flex flex-row h-10 items-center space-x-2">
        <div className="flex-1 flex flex-col truncate">
          <div className="text-xs truncate font-semibold">{job.name}</div>
          <div className="flex flex-row justify-between">
            <div className="text-xxs text-gray-500">
              {job.startedAt ? (
                <span>{job.startedAt}</span>
              ) : (
                <span>Pending...</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center">
          {!job.paused && job.running && (
            <Button
              size="sm"
              mode="ghost"
              rounded
              squared
              className="text-amber-500"
              onClick={handlePause}
            >
              <PauseIcon />
            </Button>
          )}
          {(job.paused || !job.running) && (
            <Button
              size="sm"
              mode="ghost"
              rounded
              squared
              className="text-lime-500"
              onClick={handleStart}
            >
              <PlayIcon />
            </Button>
          )}
          <Button
            size="sm"
            mode="ghost"
            rounded
            squared
            className="text-red-400"
            onClick={handleStop}
          >
            <StopIcon />
          </Button>
        </div>
      </div>
      <Progress
        value={job.progress?.current || 0}
        max={job.progress?.total || 100}
      />
    </li>
  );
}
