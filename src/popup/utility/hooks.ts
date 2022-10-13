import { useEffect, useState } from 'react';

export const useActiveTab = () => {
  const [activeTab, setActiveTab] = useState<browser.tabs.Tab | null>(null);

  useEffect(() => {
    browser.tabs.query({ active: true })
    .then((res) => {
      console.log(res)
      setActiveTab(res[0]);
    });
  }, []);

  return activeTab;
};
