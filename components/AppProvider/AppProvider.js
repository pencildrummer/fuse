import socket from 'lib/client/socket'
import { pathCase } from 'lib/shared/strings'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { IntlProvider } from 'react-intl'
import * as messages from '../../lang/index'
import initPluginSocket from './utilities/initPluginSockets'

export const AppContext = React.createContext()

export default function AppProvider({
  devices,
  profiles,
  plugins,
  locale = 'en',
  ...props
}) {

  const [providerDevices, setProviderDevices] = useState(devices || [])
  const [providerProfiles, setProviderProfiles] = useState(profiles || {})

  // Init socket for plugins if needed
  const providerPlugins = useMemo(_ => {
    return plugins?.map(plugin => {
      let socket = initPluginSocket(plugin)
      if (!socket)
        return plugin
      return {
        ...plugin,
        socket: socket
      }
    })
  }, [plugins])

  useEffect(_ => {
		// Add socket listener for newly created device
		socket.on('devices:added', (device) => {
      setProviderDevices(devices => [...devices, device])
		})
    // Add socket listener for updated device
    socket.on('devices:updated', (device) => {
      setProviderDevices(devices => {
        let index = devices.findIndex(d => d.id === device.id)
        if (index < 0) {
          console.error('Received updated device but not found in current ones', device)
          return devices
        } else {
          let newDevices = [...devices]
          newDevices[index] = device
          return newDevices
        }
      })
    })
    // Add socket listener for removed device
    socket.on('devices:removed', (device) => {
      setProviderDevices(devices => devices.filter(d => d.id !== device.id))
    })

    /**
     * Profiles
     */
    socket.on('profiles:added', (profile) => {
      // Add received new profile to in memory ones
      const brand = pathCase(profile.brand)
      setProviderProfiles(profiles => {
        let newProfiles = {...profiles}
        newProfiles[brand] = newProfiles[brand] || []
        newProfiles[brand].push(profile)
        return newProfiles
      })
    })

    socket.on('profiles:updated', (profile) => {
      // Updated received profile to in memory ones
      setProviderProfiles(profiles => {
        let brand = pathCase(profile.brand)
        let editIndex = profiles[brand].findIndex(p => p.id == profile.id)
        if (editIndex == -1) {
          console.error('Unable to find index for received updated profile with id', profile.id)
          return profiles
        }
        // Replace received profile with old one
        let updatedProfiles = {...profiles}
        updatedProfiles[brand].splice(editIndex, 1, profile)
        return updatedProfiles
      })
    })

    socket.on('profiles:deleted', (id) => {
      // Remove deleted profiles form the in memory ones
      setProviderProfiles(profiles => {
        let keyPath = id.split('.')
        let brand = pathCase(keyPath[0])
        let model = pathCase(keyPath[1])
        if (profiles[brand]) {
          let updateProfiles = {...profiles}
          updateProfiles[brand] = updateProfiles[brand].filter(p => p.id != id)
          return updateProfiles
        } else {
          console.warn('Received deleted profile event for profile "'+id+'" but profile is not found')
          return profiles
        }
      })
    })
	}, [])

  return <AppContext.Provider value={{
    devices: providerDevices,
    profiles: providerProfiles,
    plugins: providerPlugins,
  }}>
    <IntlProvider defaultLocale='en' locale={locale} messages={messages[locale]}>
      {props.children}
    </IntlProvider>
  </AppContext.Provider>
}

export function useAppContext() {
  const ctx = useContext(AppContext)
  if (!ctx)
    throw new Error('useAppContext can only be used inside an AppProvider')
    return ctx
}