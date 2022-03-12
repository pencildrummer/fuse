import { Button, Popover, Progress, EmptyView, useDeviceStatusListContext } from '@fuse-labs/core-ui'
import { LayersIcon, PauseIcon, StopIcon } from '@radix-ui/react-icons'
import { useDeviceContext } from 'plugins/@fuse-labs/core-client'
import { useEffect, useState } from 'react'

export default function MarlinJobQueueHandler() {

  const { device } = useDeviceContext()
  const { addStatus, removeStatus } = useDeviceStatusListContext()
  const [jobs, setJobs] = useState([])

  useEffect(_ => {
    const handleJobAdded = job => {
      setJobs(jobs => [...jobs, job])
    }

    const handleJobProgress = job => {
      setJobs(jobs => {
        let newJobs = [...jobs]
        let jobIndex = newJobs.findIndex(j => j.id === job.id)
        if (jobIndex > -1) {
          newJobs.splice(jobIndex, 1, job)
        } else {
          console.warn('Received progress update for a job not in the queue')
        }
        return newJobs
      })
    }

    const handleJobFinish = job => {
      setJobs(jobs => jobs.filter(j => j.id !== job.id))
      let status = addStatus(`Finished job ${job.name}`, { type: 'success'})
      setTimeout(_ => removeStatus(status.id), 1500)
    }

    device.socket.on('job:added', handleJobAdded)
    device.socket.on('job:progress', handleJobProgress)
    device.socket.on('job:finish', handleJobFinish)
    return _ => {
      device.socket.off('job:added', handleJobAdded)
      device.socket.off('job:progress', handleJobProgress)
      device.socket.off('job:finish', handleJobFinish)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [device])

  return (
    <Popover>
      <Popover.Trigger>
        <Button size="sm" mode="ghost" squared>
          <LayersIcon />
        </Button>
      </Popover.Trigger>
      <Popover.Content align="end">
        <JobList jobs={jobs} />
      </Popover.Content>
    </Popover>
  )
}

function JobList({
  jobs
}) {
  return (
    <ul className='p-1 divide-y divide-gray-600'>
      <li className='leading-none flex items-center pb-1.5'>
        <span className='font-syncopate text-xxs leading-none uppercase'>
          Jobs
        </span>
      </li>
      {jobs?.length ? 
        jobs?.map(job => <JobListItem key={`job-${job.id}`} job={job} />)
      : (
        <li className='pt-5 pb-4 text-xs text-gray-500'>
          <EmptyView text="No jobs in the queue" />
        </li>
      )}
    </ul>
  )
}

function JobListItem({
  job
}) {
  return (
    <li className='flex flex-col max-w-[200px] pb-2 last:pb-0'>
      <div className='flex flex-row h-10 items-center space-x-2'>
        <div className='flex-1 flex flex-col truncate'>
          <div className='text-xs truncate font-semibold'>
            {job.name}
          </div>
          <div className='flex flex-row justify-between'>
            <div className='text-xxs text-gray-500'>
              {job.startedAt 
              ? (<span>{job.startedAt}</span>)
              : (<span>Pending...</span>)}
            </div>
          </div>
        </div>
        <div className='flex flex-row items-center'>
          <Button size="sm" mode="ghost" rounded squared className="text-amber-500">
            <PauseIcon />
          </Button>
          <Button size="sm" mode="ghost" rounded squared className="text-red-400">
            <StopIcon />
          </Button>
        </div>
      </div>
      <Progress value={job.progress?.current || 0} max={job.progress?.total || 100} />
    </li>
  )
}