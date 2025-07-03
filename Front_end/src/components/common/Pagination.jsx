import { useMemo } from "react";

import Button from "./Button";

export default function Pagination({
  pageTotal,
  pageCurrent,
  pageCount = 5,
  setPageCurrent,
}) {
  const arr = Array.from({ length: pageTotal }, (_, i) => i + 1);

  const calculatePaginater = () => {
    if (pageTotal <= pageCount) {
      return arr;
    }

    let start = Math.max(0, pageCurrent - Math.round(pageCount / 2));
    let end = start + pageCount;

    if (end > pageTotal) {
      end = pageTotal;
      start = end - pageCount;
    }

    return arr.slice(start, end);
  };
  const paginater = useMemo(
    () => calculatePaginater(),
    [pageCurrent, pageTotal]
  );

  const handleNextPage = () => {
    const page = pageCurrent + 1;
    if (page > pageTotal) return;
    setPageCurrent(page);
  };

  const handlePrevPage = () => {
    const page = pageCurrent - 1;
    if (page < 0) return;
    setPageCurrent(page);
  };
  return (
    <>
      <div className="flex flex-row gap-2">
        <Button disabled={pageCurrent == 1} onClick={handlePrevPage}>
          {"<"}
        </Button>
        {paginater.map((item, index) => {
          return (
            <Button
              color={pageCurrent === item ? "primary" : ""}
              key={index}
              onClick={() => setPageCurrent(item)}
            >
              {item}
            </Button>
          );
        })}
        <Button disabled={pageCurrent == pageTotal} onClick={handleNextPage}>
          {">"}
        </Button>
      </div>
    </>
  );
}
