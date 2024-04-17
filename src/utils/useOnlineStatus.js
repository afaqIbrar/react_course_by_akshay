import { useEffect, useState } from 'react';

const useOnlineStatus = () => {
  const [onlineStatus, setOnlineStatus] = useState(true);
  // input is nothing
  // check if online
  useEffect(() => {
    window.addEventListener('offline', () => {
      setOnlineStatus(false);
    });
    window.addEventListener('online', () => {
      setOnlineStatus(true);
    });
  }, []);

  // return status boolean value
  return onlineStatus;
};
export default useOnlineStatus;
