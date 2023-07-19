import React from 'react';
import './style.css';

const debounce = (fn, time = 1000) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn(...args);
    }, time);
  };
};

export default function App() {
  const [count, setCount] = React.useState(30);

  const res = [];
  for (let i = 1; i < count; i++) {
    res.push(i);
  }

  const debounceFn = debounce((c) => {
    console.log('trigger');
    setCount(c);
  }, 1000);
  React.useEffect(() => {
    const scrollDiv = document.querySelector('.scrollCon');
    scrollDiv.addEventListener('scroll', function (scroll) {
      if (
        scrollDiv.scrollTop + scrollDiv.offsetHeight >=
        scrollDiv.scrollHeight - 30
      ) {
        debounceFn(count + 20);
      }
    });
  }, [count]);
  return (
    <>
      <div style={{ fontSize: '50px', marginBottom: 50 }}>
        abcadhsfaksdfhalksdfsfa
      </div>
      <div
        className="scrollCon"
        style={{ height: '300px', overflowY: 'scroll' }}
      >
        {res.map((c) => (
          <div>{c}</div>
        ))}
      </div>
    </>
  );
}
