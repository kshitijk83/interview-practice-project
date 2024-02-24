import React, { useCallback, useEffect, useRef, useState } from "react";
import InfiniteScroll from "./InfiniteScroll";
import "./index.css";

const generateData = () => {
  const newData = [];
  for (let i = 0; i < 50; i++) {
    newData.push(i);
  }
  return newData;
};

const mockRequest = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateData());
    }, 2000);
  });
};

const InfiniteScrollCon = () => {
  const [data, setData] = useState([]);

  const [query, setQuery] = useState("");

  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isNext, setIsNext] = useState(false);

  const handleQuery = (e) => setQuery(e.target.value);

  const controller = useRef();

  const getData = async ({ pageNum, query, pageSize }) => {
    console.log({ pageNum, query });
    controller.current = new AbortController();
    const resp = await fetch(
      "https://openlibrary.org/search.json?" +
        new URLSearchParams({
          q: query,
          limit: pageSize,
          offset: (pageNum - 1) * pageSize,
          sort: "title",
        }),
      {
        signal: controller.current.signal,
      }
    );
    const data = await resp.json();
    setData((prev) => [...prev, ...data.docs]);
    setIsNext(data.docs.length > 0);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 600);

    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  const x = debouncedQuery;
  return (
    <div className="infiniteScroll">
      <input type="text" onChange={handleQuery} value={query} />
      <InfiniteScroll
        data={data}
        query={debouncedQuery}
        isNext={isNext}
        renderListItem={(item, index) => (
          <div>
            {item.title} -{}
          </div>
        )}
        asyncRequest={getData}
      />
    </div>
  );
};

export default InfiniteScrollCon;
