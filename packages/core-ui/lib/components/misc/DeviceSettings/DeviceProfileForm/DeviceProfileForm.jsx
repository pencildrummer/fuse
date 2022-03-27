import { useFormikContext } from "formik";
import { Button, Form, Group, Input, Label, Separator } from "../../../shared";
import { useEffect, useMemo, useState } from "react";
import DeviceTypeSelect from "../DeviceTypeSelect/DeviceTypeSelect";
import FDMPrinterDeviceProfileFormContent from "./FDMPrinterDeviceProfileFormContent";
import MSLAPrinterDeviceProfileFormContent from "./MSLAPrinterDeviceProfileFormContent";
import * as Yup from 'yup'
import { coreSocket } from "@fuse-labs/core-client";

export default function DeviceProfileForm({
  profile,
}) {

  const [deviceType, setDeviceType] = useState('fdm_printer')
  const defaults = useMemo(_ => ({
    brand: '',
    model: '',
    type: deviceType,
  }), [deviceType])
  
  const validationSchema = useMemo(_ => {
    return Yup.object({
      brand: Yup.string().required('Missing device brand'),
      model: Yup.string().required('Missing device model')
    })
  }, [])

  const initialValues = useMemo(_ => {
    switch (deviceType) {
      case 'fdm_printer': return {
        ...defaults,
        volume: {
          width: 200,
          depth: 200,
          height: 200,
          origin: 'lower-left',
          formFactor: 'rectangular'
        },
        bed: {
          heated: true,
        },
        gCodeVersion: 'marlin',
        xAxis: { maxSpeed: 6000 },
        yAxis: { maxSpeed: 6000 },
        zAxis: { maxSpeed: 3000 },
        ...profile
      }
      case 'msla_printer': return {
        ...defaults,
        volume: {
          width: 120,
          depth: 85,
          height: 130
        },
        ...profile
      }
      default: return {
        ...defaults,
        ...profile
      }
    }
  }, [defaults, deviceType, profile])

  function handleSubmit(values) {
    // Check if we are editing or creating
    if (profile.id) {
      coreSocket.emit('profiles:update', profile.id, values, (profile) => {
        console.log('Updated profile', profile)
      })
    } else {
      coreSocket.emit('profiles:add', values, (profile) => {
        console.log('Added profile', profile)
      })
    }
  }
  
  return <Form onSubmit={handleSubmit}
    validationSchema={validationSchema}
    initialValues={initialValues} enableReinitialize={true} >
    <DeviceProfileFormContent deviceType={deviceType} onDeviceTypeChange={setDeviceType}/>
  </Form>
}

function DeviceProfileFormContent({
  deviceType,
  onDeviceTypeChange,
  ...props
}) {

  let { values } = useFormikContext()
  useEffect(_ => {
    onDeviceTypeChange?.(values?.type)
  }, [onDeviceTypeChange, values?.type])

  return (
    <>
      <Group orientation="vertical">
        <Group>
          <Label>Brand</Label>
          <Input name="brand" disabled={values?.id}/>
        </Group>
        <Group>
          <Label>Model</Label>
          <Input name="model" disabled={values?.id}/>
        </Group>
        <Group>
          <Label>Device type</Label>
          <DeviceTypeSelect name="type" disabled={values?.id}/>
        </Group>
      </Group>
      <Separator />
      <div className="flex-1">
        {deviceType == 'fdm_printer' && <FDMPrinterDeviceProfileFormContent />}
        {deviceType == 'msla_printer' && <MSLAPrinterDeviceProfileFormContent />}
      </div>
      <Separator />
      <Group className="justify-end">
        <Button type="submit">
          Save
        </Button>
      </Group>
    </>
  )
}