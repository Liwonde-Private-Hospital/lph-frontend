'use client'
import React, { useState, useEffect } from "react";

const NumberAnimation = () => {
  const startValue = 50; // Initial value
  const endValue = 300; // Target value
  const [currentValue, setCurrentValue] = useState(startValue);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentValue((prevValue) => {
        // If currentValue reaches endValue, clear the interval
        if (prevValue === endValue) {
          clearInterval(interval);
          return prevValue;
        } else {
          return prevValue + 1; // Increment currentValue by 1
        }
      });
    }, 100); // Adjust the interval for smoother animation
    return () => clearInterval(interval);
  }, [startValue, endValue]);

  return <span>{currentValue}+</span>; // Display currentValue with '+' sign
};

export default NumberAnimation;
