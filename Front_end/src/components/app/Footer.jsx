import { useEffect, useState } from "react";

export default function Footer() {
  const [lastVisit, setLastVisit] = useState();

  useEffect(() => {
    const visited = localStorage.getItem("last-visited");
    if (visited) {
      setLastVisit(new Date(visited).toLocaleString());
      console.log(new Date(visited).toLocaleString());
    }

    const now = new Date().toISOString();
    localStorage.setItem("last-visited", now);
  }, []);

  return (
    <footer className="h-16 bg-white flex justify-center items-center border-t-1">
      <p className="text-black">{lastVisit}</p>
    </footer>
  );
}
