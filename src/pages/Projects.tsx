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
      <BackToHome />

      <Menu />
      <div className="max-w-8xl mx-10 mx-auto mb-10 mt-10 min-w-[300px] px-6 text-gray-500 lg:px-0 xl:ml-16">
        <div>
          <h1 className="mb-[48px] hidden text-[29px] font-bold text-gray-500 lg:block">
            Projects
          </h1>
          {projects.map((project: ProjectYear) => (
            <div key={project.year}>
              <span className="text-base font-bold xs:text-lg sm:text-xl md:text-xl">
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
                  {entry.role} |{" "}
                  <span className="font-normal">{entry.title}</span>{" "}
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
