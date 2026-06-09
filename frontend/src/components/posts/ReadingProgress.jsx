import { useEffect, useState } from "react";

function ReadingProgress() {

  const [width, setWidth] =
    useState(0);

  useEffect(() => {

    const update = () => {

      const scroll =
        document.documentElement.scrollTop;

      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      setWidth((scroll / height) * 100);
    };

    window.addEventListener(
      "scroll",
      update
    );

    return () =>
      window.removeEventListener(
        "scroll",
        update
      );

  }, []);

  return (
    <div
      style={{
        width: `${width}%`,
      }}
      className="fixed top-0 left-0 h-1 bg-blue-500 z-50"
    />
  );
}

export default ReadingProgress;