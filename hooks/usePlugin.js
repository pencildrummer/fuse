import { useAppContext } from "components/AppProvider/AppProvider";

// TODO - Maybe create a plugin class for client to be used instead of using React specific hook?
export default function usePlugin(name) {
  const { plugins } = useAppContext()
  return plugins.find(plugin => plugin.name == name)
}