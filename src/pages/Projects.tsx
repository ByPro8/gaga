import { useEffect, useState } from "react";
import Menu from "../components/Menu";
import BackToHome from "../components/BackToHome";
import { fetchProjects } from "../lib/sanity";
import type { CmsProjectYear } from "../types/cms";

export default function Projects() {
  const [projectYears, setProjectYears] = useState<CmsProjectYear[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetchProjects()
      .then((data) => {
        if (isMounted) setProjectYears(data);
      })
      .catch((error) => {
        console.error("Could not load Projects from Sanity:", error);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
      <Menu />
      <div className="mb-10 h-screen w-full min-w-[300px] px-10 pt-[60px] text-gray-500 lg:ml-10 lg:overflow-y-auto lg:px-0 xl:ml-10">
        <h1 className="mb-[48px] text-[29px] text-gray-500">
          <BackToHome />
          Projects
        </h1>

        {isLoading ? (
          <p className="text-gray-400">Loading...</p>
        ) : projectYears.length === 0 ? (
          <p className="text-gray-400">No projects published yet.</p>
        ) : (
          projectYears.map((yearGroup) => (
            <div key={yearGroup._id} className="mb-6">
              <span className="text-base xs:text-lg sm:text-xl md:text-xl">
                {yearGroup.yearLabel}
              </span>
              <br />
              {yearGroup.entries.map((entry) => (
                <div
                  key={entry._key}
                  className="text-sm xs:text-base sm:text-lg md:text-xl"
                >
                  <span className="text-[20px]">{entry.role}</span> |{" "}
                  <span className="text-[20px]">{entry.title}</span>{" "}
                  {entry.company && (
                    <>
                      |{" "}
                      <span className="text-[17px] font-bold">
                        {entry.company}
                      </span>
                    </>
                  )}
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
