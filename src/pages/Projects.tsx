import GAGALENS from "../components/GAGALENS";
import { Link } from "react-router-dom";
import projects from "../Data/projects.ts";

interface ProjectEntry {
  role: string;
  title: string;
  company: string;
}

interface ProjectYear {
  year: number | string;
  entries: ProjectEntry[];
}

export default function Projects() {
  return (
    <div className="mx-auto p-10 text-2xl">
      <Link
        to="/"
        className="xl2:left-24 xl2:top-24 fixed absolute left-[31px] top-[50px] rounded-full p-2 text-sm text-gray-500 transition-all duration-300 hover:bg-gray-100 hover:text-black sm:left-[80px] sm:top-[65px] lg:left-[130px] lg:top-[65px] lg:text-xl xl:left-[175px] xl:top-[65px]"
      >
        &larr;
      </Link>

      <GAGALENS
        className="w-[100%] pt-8 text-center"
        classNameG="text-[40px] sm:text-[48px] lg:text-[54px]"
        classNameB="text-[13px] sm:text-[16px] lg:text-[20px]"
      />
      <div className="max-w-8xl min-w-[300px] pt-10 text-gray-500 sm:px-12 lg:px-24">
        {projects.map((project: ProjectYear) => (
          <div key={project.year}>
            <span className="text-base font-bold xs:text-lg sm:text-xl md:text-2xl">
              {project.year}
            </span>
            <br />
            {project.entries.map((entry, index) => (
              <div
                key={index}
                className="text-sm xs:text-base sm:text-lg md:text-xl"
              >
                <span className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                  •
                </span>{" "}
                {entry.role} | <strong>{entry.title}</strong>{" "}
                {entry.company && (
                  <>
                    | <strong>{entry.company}</strong>
                  </>
                )}
                <br />
              </div>
            ))}
            <br />
          </div>
        ))}
      </div>
    </div>
  );
}
