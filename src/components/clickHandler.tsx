import React, { useState, useEffect } from 'react';
import logo from '../assets/ClickerLogo.png';

export function ClickHandler(props: {
  balanceRef: React.MutableRefObject<{ value: number }>,
  increment: number
}) {
  const [texts, setTexts] = useState<
    Array<{ value: string; position: { x: number; y: number }; opacity: number }>
  >([]);

  const fadeOutText = (index: number) => {
    setTexts((prevTexts) =>
      prevTexts.map((text, i) => (i === index ? { ...text, opacity: 0 } : text))
    );
  };

  const handleClickText = (event: React.MouseEvent<HTMLImageElement>) => {
    const { clientX, clientY } = event;
    const newText = { value: `+${props.increment}`, position: { x: clientX, y: clientY }, opacity: 1 };

    setTexts((prevTexts) => [...prevTexts, newText]);
  };

  function handleClick() {
    props.balanceRef.current.value = Math.round((props.balanceRef.current.value + props.increment) * 100) / 100;
  }

  useEffect(() => {
    // Simulate the floating effect using setInterval
    const intervalId = setInterval(() => {
      setTexts((prevTexts) =>
        prevTexts.map((text) => ({
          ...text,
          position: { ...text.position, y: text.position.y - 1 },
        }))
      );
    }, 10);

    // Clear the interval after a short duration
    setTimeout(() => {
      clearInterval(intervalId);
    }, 500);

    // Fade out the last text after it's added
    if (texts.length > 0) {
      const lastTextIndex = texts.length - 1;
      setTimeout(() => {
        fadeOutText(lastTextIndex);
      }, 1000);
    }

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [texts]);

  return (
    <>
      <img
        onClick={(e) => {
          handleClick();
          handleClickText(e);
        }}
        src={logo}
        alt="logo"
        className='logoImg'
        title='Click me!'
        draggable='false'
        style={{ userSelect: 'none' }}
      />
      {texts.map((text, index) => (
        <div
          key={index}
          style={{
            color: '#fff',
            fontSize: '20px',
            position: 'absolute',
            top: text.position.y - 30,
            left: text.position.x - 16,
            padding: '5px',
            zIndex: 9999,
            pointerEvents: 'none',
            transition: 'opacity 0.5s ease', // Add a smooth fading transition
            opacity: text.opacity,
          }}
        >
          {text.value}
        </div>
      ))}
    </>
  );
}
