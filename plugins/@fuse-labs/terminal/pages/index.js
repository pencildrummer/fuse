import MarlinTerminalWidget from '../components/MarlinTerminalWidget/MarlinTerminalWidget.js';
import MarlinTerminalSettingsWidget from '../components/MarlinTerminalSettingsWidget/MarlinTerminalSettingsWidget.js';

export default function TerminalPage() {
  return (<>
    <MarlinTerminalWidget />
    <MarlinTerminalSettingsWidget />
  </>)
}