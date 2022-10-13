import { useActiveTab } from '../utility/hooks';
import { ADD_PIN } from '../../utility/constants';

export default function App() {
  const activeTab = useActiveTab();

  const handleAddPin = () => {
    browser.tabs.sendMessage(activeTab?.id || 0, ADD_PIN);
  };
  return (
    <button onClick={handleAddPin}>Add new pin</button>
  )
}