import projects from "../site/projects.ts";
import Menu from "../components/Menu.tsx";
import BackToHome from "../components/BackToHome.tsx";

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
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
      <Menu />
      <div className="max-w-8xl mx-10 mx-auto mb-10 ml-10 mt-10 min-w-[300px] text-gray-500 lg:px-0 xl:ml-16">
        <div>
          <h1 className="mb-[48px] text-[29px] text-gray-500">
            <BackToHome />
            Projects
          </h1>
          {projects.map((project: ProjectYear) => (
            <div key={project.year}>
              <span className="text-base xs:text-lg sm:text-xl md:text-xl">
                {project.year}
              </span>
              <br />
              {project.entries.map((entry, index) => (
                <div
                  key={index}
                  className="text-sm xs:text-base sm:text-lg md:text-xl"
                >
                  <span className="text- text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-xl">
                    •
                  </span>{" "}
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
                  <br />
                </div>
              ))}
              <br />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
