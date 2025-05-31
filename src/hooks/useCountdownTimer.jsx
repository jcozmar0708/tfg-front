import { useEffect, useState } from "react";

const MAX_TIME = 120 * 1000;

const useCountdownTimer = (initialKey = "verifyEmailSentAt") => {
  const [timer, setTimer] = useState(0);
  const [sentAt, setSentAt] = useState(() =>
    Number(sessionStorage.getItem(initialKey))
  );

  useEffect(() => {
    if (!sentAt || isNaN(sentAt)) {
      setTimer(0);
      return;
    }

    const now = Date.now();
    const remaining = Math.max(
      0,
      Math.floor((MAX_TIME - (now - sentAt)) / 1000)
    );
    setTimer(remaining);

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [sentAt]);

  const restartTimer = () => {
    const now = Date.now();
    sessionStorage.setItem(initialKey, now);
    setSentAt(now);
  };

  return { timer, restartTimer };
};

export default useCountdownTimer;
