import { useState, useEffect } from "react";
import data from "./data";
import Contact from "./components/Contact";

function App() {
  const [pageData, setPageData] = useState(data);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    const groupedByYear = data.works.reduce((acc, work) => {
      const year = work.year || "Unknown Year"; // Handle missing year
      if (!acc[year]) acc[year] = [];
      acc[year].push(work);
      return acc;
    }, {});

    const sortedYears = Object.keys(groupedByYear).sort((a, b) => b - a);

    setPageData({ works: groupedByYear, years: sortedYears });
  }, []);

  return (
    <div className="flex h-screen w-full flex-col items-start justify-start gap-2 p-6 font-[terminal-grotesque]">
      <div className="flex flex-wrap items-center gap-3 text-3xl sm:text-6xl">
        <h1 className="animate-pulse">instrumento</h1>
        <div className="size-2 rounded-full bg-accent sm:size-3"></div>
        <h2 className="text-2xl">web design & development studio</h2>
      </div>
      {pageData.years &&
        pageData.years.map((year) => (
          <div key={year}>
            <h3 className="mt-2 font-bold">{year}</h3>
            <ul className="text-2xl sm:text-4xl">
              {pageData.works[year].map((work) => (
                <li key={work.id}>
                  <a
                    href={work.url}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-accent"
                  >
                    {work.title}
                  </a>
                  {work.details && (
                    <span className="text-base font-thin italic">
                      {" "}
                      ({work.details.es})
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}

      <button
        className="mt-8 bg-text px-2 text-2xl text-background hover:bg-accent sm:text-4xl"
        onClick={() => setIsContactOpen(!isContactOpen)}
      >
        contact
      </button>

      {isContactOpen && (
        <div className="fixed inset-0 flex h-screen w-screen items-center justify-center bg-background text-2xl sm:text-4xl">
          <button
            className="absolute right-4 top-4 hover:text-accent"
            onClick={() => setIsContactOpen(false)}
          >
            X
          </button>
          <Contact />
        </div>
      )}
    </div>
  );
}

export default App;
