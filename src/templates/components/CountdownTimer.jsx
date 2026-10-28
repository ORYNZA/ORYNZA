import React, { useState, useEffect } from 'react';

/**
 * Reusable Countdown Timer Component for ORYNZA templates.
 * 
 * @param {string} targetDate - ISO string or parseable date string
 * @param {string} className - Optional container CSS class name
 * @param {Object} labels - Custom labels for time units
 * @param {Function} onExpire - Optional callback when countdown reaches zero
 */
export default function CountdownTimer({
  targetDate,
  className = '',
  labels = { days: 'Days', hours: 'Hours', minutes: 'Mins', seconds: 'Secs' },
  onExpire,
}) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  useEffect(() => {
    if (!targetDate) return;
    const target = new Date(targetDate).getTime();
    if (isNaN(target)) return;

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
          isPast: false,
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        onExpire?.();
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate, onExpire]);

  if (timeLeft.isPast) return null;

  return (
    <div
      className={`orynza-countdown-timer ${className}`.trim()}
      role="timer"
      aria-label={`Time remaining until celebration: ${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes, and ${timeLeft.seconds} seconds`}
    >
      <div className="orynza-countdown-col" data-unit="days">
        <span className="orynza-countdown-value" aria-hidden="true">{timeLeft.days}</span>
        <span className="orynza-countdown-label">{labels.days}</span>
      </div>
      <div className="orynza-countdown-col" data-unit="hours">
        <span className="orynza-countdown-value" aria-hidden="true">{timeLeft.hours}</span>
        <span className="orynza-countdown-label">{labels.hours}</span>
      </div>
      <div className="orynza-countdown-col" data-unit="minutes">
        <span className="orynza-countdown-value" aria-hidden="true">{timeLeft.minutes}</span>
        <span className="orynza-countdown-label">{labels.minutes}</span>
      </div>
      <div className="orynza-countdown-col" data-unit="seconds">
        <span className="orynza-countdown-value" aria-hidden="true">{timeLeft.seconds}</span>
        <span className="orynza-countdown-label">{labels.seconds}</span>
      </div>
    </div>
  );
}
