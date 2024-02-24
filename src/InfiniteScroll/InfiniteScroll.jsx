import React, { useCallback, useEffect, useRef, useState } from "react";

const InfiniteScroll = ({
  renderListItem,
  asyncRequest,
  data,
  query,
  isNext,
}) => {
  const loaderRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const [pageNum, setPageNum] = useState(1);
  // const pageNum = useRef(1);

  // const observer = useRef(null);

  const getData = () => {
    setLoading(true);
    console.log(query);
    asyncRequest({ pageNum: pageNum, query: query, pageSize: 50 }).finally(
      () => {
        setLoading(false);
        // pageNum.current++;
      }
    );
  };

  useEffect(() => {
    if (!loaderRef.current) return;
    const bottom = loaderRef.current;
    const observer = new IntersectionObserver(
      (entries, observer) => {
        const loading = entries[0];
        if (loading.isIntersecting && isNext) {
          setPageNum((prev) => prev + 1);
          // getData();
          observer.unobserve(loading.target);
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(bottom);
    return () => {
      observer.unobserve(bottom);
      observer.disconnect();
    };
  }, [data]);

  useEffect(() => {
    if (query) getData();
  }, [pageNum, query]);

  useEffect(() => {
    setPageNum(1);
  }, [query]);

  const renderItem = (item, index) => renderListItem(item);

  return (
    <div>
      {renderListItem &&
        data.map((item, idx) => {
          if (idx === data.length - 1) {
            return (
              <>
                {renderItem(item)}
                <div ref={loaderRef}></div>
                <div>{loading && <div>Loading...</div>}</div>
              </>
            );
          }
          return renderItem(item);
        })}
    </div>
  );
};

export default InfiniteScroll;
