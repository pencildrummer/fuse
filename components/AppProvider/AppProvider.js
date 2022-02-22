import socket from 'lib/client/socket'
import { pathCase } from 'lib/shared/strings'
import React, { useContext, useEffect, useState } from 'react'
import { IntlProvider } from 'react-intl'
import * as messages from '../../lang/index'

export const AppContext = React.createContext()

export default function AppProvider({
  appData,
  ...props
}) {

  const locale = 'en'

  const [devices, setDevices] = useState(appData?.devices || [])
  const [profiles, setProfiles] = useState(appData?.profiles || {})
  const [plugins, setPlugins] = useState(appData?.plugins || [])

  useEffect(_ => {
		// Add socket listener for newly created device
		socket.on('core.devices.added', (device) => {
      setDevices(devices => [...devices, device])
		})
    // Add socket listener for updated device
    socket.on('core.devices.updated', (device) => {
      setDevices(devices => {
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
    socket.on('core.devices.removed', (device) => {
      setDevices(devices => devices.filter(d => d.id !== device.id))
    })

    /**
     * Profiles
     */
    socket.on('core.profiles.added', (profile) => {
      // Add received new profile to in memory ones
      const brand = pathCase(profile.brand)
      setProfiles(profiles => {
        let newProfiles = {...profiles}
        newProfiles[brand] = newProfiles[brand] || []
        newProfiles[brand].push(profile)
        return newProfiles
      })
    })

    socket.on('core.profiles.updated', (profile) => {
      // Updated received profile to in memory ones
      setProfiles(profiles => {
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

    socket.on('core.profiles.deleted', (id) => {
      // Remove deleted profiles form the in memory ones
      setProfiles(profiles => {
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
    ...appData,
    devices,
    profiles,
    plugins,
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