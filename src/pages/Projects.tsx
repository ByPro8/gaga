import { useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import Menu from "../components/Menu";
import BackToHome from "../components/BackToHome";
import { useSiteSettings } from "../context/SiteSettingsContext";
import { fetchProjects } from "../lib/sanity";
import type { CmsProjectYear } from "../types/cms";
import ProjectsDesignLabExtra, {
  EXTRA_DESIGN_OPTIONS,
  getLogoUrl,
  matchesClient,
  type ExtraDesignVariant,
} from "../components/ProjectsDesignLabExtra";

type CoreDesignVariant =
  | "client-cards"
  | "editorial-grid"
  | "magazine-years"
  | "year-accordion";

type DesignVariant = CoreDesignVariant | ExtraDesignVariant;

const DESIGN_OPTIONS: Array<{ id: DesignVariant; label: string }> = [
  { id: "client-cards", label: "1. Client Cards" },
  { id: "editorial-grid", label: "2. Card Grid + Roles" },
  { id: "magazine-years", label: "3. Big Yellow Years" },
  { id: "year-accordion", label: "4. Year Accordion" },
  ...EXTRA_DESIGN_OPTIONS,
];

export default function Projects() {
  const { settings } = useSiteSettings();
  const [projectYears, setProjectYears] = useState<CmsProjectYear[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Temporary preview switcher — all 13 looks use ONLY GAGALENS white + gray + yellow
  const [activeLook, setActiveLook] = useState<DesignVariant>(
    "static-cards-corner-logos",
  );
  const [showAllProjects, setShowAllProjects] = useState(false);

  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>("All");
  const [openYearIds, setOpenYearIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let isMounted = true;

    fetchProjects()
      .then((data) => {
        if (!isMounted) return;
        setProjectYears(data);
        const initialOpen: Record<string, boolean> = {};
        data.slice(0, 2).forEach((year) => {
          initialOpen[year._id] = true;
        });
        setOpenYearIds(initialOpen);
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

  const { featuredYears, featuredCount, totalCount } = useMemo(() => {
    let total = 0;
    let featured = 0;
    const filteredYears: CmsProjectYear[] = [];

    for (const yearGroup of projectYears) {
      total += yearGroup.entries.length;
      const starred = yearGroup.entries.filter((entry) => entry.isFeatured);
      if (starred.length > 0) {
        featured += starred.length;
        filteredYears.push({ ...yearGroup, entries: starred });
      }
    }

    return {
      featuredYears: filteredYears,
      featuredCount: featured,
      totalCount: total,
    };
  }, [projectYears]);

  const hasFeatured = featuredCount > 0;
  const baseYears =
    hasFeatured && !showAllProjects ? featuredYears : projectYears;
  const clientLogos = settings?.clientLogos ?? [];

  const flatEntries = useMemo(() => {
    return baseYears.flatMap((yearGroup) =>
      yearGroup.entries.map((entry) => ({
        ...entry,
        yearLabel: yearGroup.yearLabel,
      })),
    );
  }, [baseYears]);

  const roleFilters = [
    "All",
    "Director",
    "Producer",
    "Cameraman",
    "Photographer",
  ];
  const roleFilteredEntries = useMemo(() => {
    if (selectedRole === "All") return flatEntries;
    return flatEntries.filter((entry) =>
      entry.role.toLowerCase().includes(selectedRole.toLowerCase()),
    );
  }, [flatEntries, selectedRole]);

  const clientFilteredYears = useMemo(() => {
    if (!selectedClient) return baseYears;
    return projectYears
      .map((yearGroup) => ({
        ...yearGroup,
        entries: yearGroup.entries.filter((entry) =>
          matchesClient(entry.company, selectedClient),
        ),
      }))
      .filter((yearGroup) => yearGroup.entries.length > 0);
  }, [baseYears, projectYears, selectedClient]);

  function toggleAccordionYear(yearId: string) {
    setOpenYearIds((prev) => ({ ...prev, [yearId]: !prev[yearId] }));
  }

  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
      <Menu />

      <div className="h-screen w-full min-w-[300px] overflow-y-auto px-6 pb-20 pt-[48px] text-gray-500 sm:px-10 lg:px-12 lg:pt-[56px]">
        <div className="max-w-[960px]">
          {/* TEMPORARY DESIGN SWITCHER BAR — strictly white + gray + GAGALENS yellow */}
          <div className="mb-8 rounded-xl border border-gaga1 bg-[#FFFDF7] p-3">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-demi uppercase tracking-wider text-gray-500">
                Design Lab — 13 clean white/gray/yellow looks
              </span>
              {hasFeatured && (
                <div className="flex items-center gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAllProjects(false);
                      setSelectedClient(null);
                    }}
                    className={`rounded-full border px-3 py-1 transition-colors focus:outline-none ${
                      !showAllProjects
                        ? "border-gaga bg-gaga1/60 font-demi text-gray-800"
                        : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
                    }`}
                  >
                    Selected ({featuredCount})
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAllProjects(true);
                      setSelectedClient(null);
                    }}
                    className={`rounded-full border px-3 py-1 transition-colors focus:outline-none ${
                      showAllProjects
                        ? "border-gaga bg-gaga1/60 font-demi text-gray-800"
                        : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
                    }`}
                  >
                    All ({totalCount})
                  </button>
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {DESIGN_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    setActiveLook(option.id);
                    setSelectedClient(null);
                  }}
                  className={`rounded-lg border px-2.5 py-1 text-xs transition-all focus:outline-none ${
                    activeLook === option.id
                      ? "border-gaga bg-gaga1/60 font-demi text-gray-800"
                      : "border-gray-200 bg-white text-gray-500 hover:border-gaga1 hover:text-gray-700"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Page title */}
          <div className="mb-8 flex items-center justify-between">
            <h1 className="flex items-center text-[29px] font-normal text-gray-500">
              <span className="lg:hidden">
                <BackToHome />
              </span>
              Projects
            </h1>
          </div>

          {isLoading ? (
            <p className="text-gray-400">Loading...</p>
          ) : (
            <>
              {/* =================================================================
                  LOOK 1: INTERACTIVE FULL-COLOR CLIENT CARDS + CLEAN ROWS
                 ================================================================= */}
              {activeLook === "client-cards" && (
                <div>
                  {clientLogos.length > 0 && (
                    <section className="mb-10">
                      <div className="mb-3 flex items-center justify-between">
                        <p className="text-xs uppercase tracking-[0.18em] text-gray-400">
                          Click a client to filter
                        </p>
                        {selectedClient && (
                          <button
                            type="button"
                            onClick={() => setSelectedClient(null)}
                            className="border-0 bg-transparent p-0 text-xs font-demi text-gray-600 underline hover:text-gray-800 focus:outline-none"
                          >
                            Clear filter ({selectedClient})
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {clientLogos.map((client) => {
                          const logoUrl = getLogoUrl(client);
                          if (!logoUrl) return null;
                          const isSelected = selectedClient === client.name;

                          return (
                            <button
                              key={client._key}
                              type="button"
                              onClick={() =>
                                setSelectedClient(
                                  isSelected ? null : client.name,
                                )
                              }
                              className={`flex h-20 items-center justify-center rounded-xl border bg-white p-4 transition-all focus:outline-none ${
                                isSelected
                                  ? "border-gaga bg-[#FFFDF7] ring-2 ring-gaga1"
                                  : "border-gray-200/80 hover:border-gaga1 hover:shadow-sm"
                              }`}
                            >
                              <img
                                src={logoUrl}
                                alt={client.name}
                                title={client.name}
                                className="max-h-10 max-w-[110px] object-contain mix-blend-multiply"
                              />
                            </button>
                          );
                        })}
                      </div>
                    </section>
                  )}

                  <div className="space-y-6">
                    {clientFilteredYears.map((yearGroup) => (
                      <div key={yearGroup._id}>
                        <h2 className="mb-3 text-xs font-demi tracking-widest text-gray-400">
                          {yearGroup.yearLabel}
                        </h2>
                        <div className="space-y-2">
                          {yearGroup.entries.map((entry) => (
                            <div
                              key={entry._key}
                              className="flex flex-col justify-between gap-1 rounded-lg border border-transparent border-l-2 border-l-gray-200 bg-[#FAFAFA] px-4 py-3 transition-all hover:border-l-gaga hover:bg-[#FFFDF7] sm:flex-row sm:items-center"
                            >
                              <div>
                                <div className="text-[17px] text-gray-700">
                                  {entry.title}
                                </div>
                                <div className="text-xs text-gray-400">
                                  {entry.role}
                                </div>
                              </div>
                              {entry.company && (
                                <span className="shrink-0 text-xs font-demi text-gray-500">
                                  {entry.company}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* =================================================================
                  LOOK 2: CLEAN 2-COLUMN CARD GRID + ROLE FILTER CHIPS (NO BLACK)
                 ================================================================= */}
              {activeLook === "editorial-grid" && (
                <div>
                  <div className="mb-6 flex flex-wrap gap-2">
                    {roleFilters.map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => setSelectedRole(role)}
                        className={`rounded-full border px-4 py-1.5 text-sm transition-colors focus:outline-none ${
                          selectedRole === role
                            ? "border-gaga bg-gaga1/50 font-demi text-gray-700"
                            : "border-gray-200 bg-white text-gray-500 hover:border-gaga1 hover:text-gray-700"
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {roleFilteredEntries.map((entry) => (
                      <article
                        key={`${entry.yearLabel}-${entry._key}`}
                        className="flex flex-col justify-between rounded-xl border border-gray-200/70 bg-[#FAFAFA] p-6 transition-all duration-200 hover:border-gaga1 hover:bg-white hover:shadow-sm"
                      >
                        <div>
                          <div className="mb-3 flex items-center justify-between gap-2">
                            <span className="inline-flex items-center gap-1.5 text-xs font-demi tracking-wider text-gray-400">
                              <span className="h-2 w-2 rounded-full bg-gaga" />
                              {entry.yearLabel}
                            </span>
                            {entry.company && (
                              <span className="text-right text-xs font-demi text-gray-500">
                                {entry.company}
                              </span>
                            )}
                          </div>
                          <h2 className="text-lg leading-snug text-gray-700">
                            {entry.title}
                          </h2>
                        </div>

                        {entry.role && (
                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {entry.role.split(",").map((part) => (
                              <span
                                key={part}
                                className="rounded-md bg-white px-2.5 py-0.5 text-xs text-gray-400 ring-1 ring-gray-200/70"
                              >
                                {part.trim()}
                              </span>
                            ))}
                          </div>
                        )}
                      </article>
                    ))}
                  </div>
                </div>
              )}

              {/* =================================================================
                  LOOK 3: BIG WARM-YELLOW YEARS GALLERY (SOFT GRAY RULES, NO BLACK)
                 ================================================================= */}
              {activeLook === "magazine-years" && (
                <div className="space-y-11">
                  {baseYears.map((yearGroup) => (
                    <section
                      key={yearGroup._id}
                      className="border-t border-gray-200 pt-5"
                    >
                      <div className="mb-5 flex flex-wrap items-end justify-between gap-2">
                        <span className="text-4xl font-bold leading-none tracking-tight text-gaga1 sm:text-5xl">
                          {yearGroup.yearLabel}
                        </span>
                        <span className="text-xs uppercase tracking-[0.2em] text-gray-400">
                          {yearGroup.entries.length}{" "}
                          {yearGroup.entries.length === 1
                            ? "credit"
                            : "credits"}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 gap-x-10 gap-y-5 md:grid-cols-2">
                        {yearGroup.entries.map((entry) => (
                          <div
                            key={entry._key}
                            className="border-b border-gray-100 pb-4"
                          >
                            <p className="text-xs uppercase tracking-widest text-gray-400">
                              {entry.role}
                            </p>
                            <h2 className="mt-1 text-lg text-gray-700">
                              {entry.title}
                            </h2>
                            {entry.company && (
                              <p className="mt-1 text-sm font-demi text-gray-500">
                                {entry.company}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              )}

              {/* =================================================================
                  LOOK 4: CLEAN LOGOS + COLLAPSIBLE YEAR ACCORDION (NO STATS BOX!)
                 ================================================================= */}
              {activeLook === "year-accordion" && (
                <div className="max-w-[780px]">
                  {clientLogos.length > 0 && (
                    <div className="mb-8 flex flex-wrap items-center gap-6">
                      {clientLogos.map((client) => {
                        const logoUrl = getLogoUrl(client);
                        if (!logoUrl) return null;
                        return (
                          <img
                            key={client._key}
                            src={logoUrl}
                            alt={client.name}
                            title={client.name}
                            className="h-8 w-auto max-w-[105px] object-contain opacity-85 mix-blend-multiply transition-opacity hover:opacity-100"
                          />
                        );
                      })}
                    </div>
                  )}

                  <div className="divide-y divide-gray-200/80 border-y border-gray-200/80">
                    {baseYears.map((yearGroup) => {
                      const isOpen = Boolean(openYearIds[yearGroup._id]);

                      return (
                        <div key={yearGroup._id}>
                          <button
                            type="button"
                            onClick={() => toggleAccordionYear(yearGroup._id)}
                            className="flex w-full items-center justify-between border-0 bg-transparent py-4 text-left transition-colors hover:text-gray-800 focus:outline-none"
                          >
                            <div className="flex items-center gap-3">
                              {isOpen ? (
                                <ChevronDown className="h-4 w-4 text-gaga" />
                              ) : (
                                <ChevronRight className="h-4 w-4 text-gray-400" />
                              )}
                              <span className="text-xl text-gray-600">
                                {yearGroup.yearLabel}
                              </span>
                            </div>
                            <span className="text-xs text-gray-400">
                              {yearGroup.entries.length}{" "}
                              {yearGroup.entries.length === 1
                                ? "project"
                                : "projects"}
                            </span>
                          </button>

                          {isOpen && (
                            <div className="space-y-3 pb-5 pl-7">
                              {yearGroup.entries.map((entry) => (
                                <div
                                  key={entry._key}
                                  className="flex flex-wrap items-baseline justify-between gap-2 text-base"
                                >
                                  <div>
                                    <span className="text-gray-700">
                                      {entry.title}
                                    </span>
                                    <span className="ml-2 text-sm text-gray-400">
                                      ({entry.role})
                                    </span>
                                  </div>
                                  {entry.company && (
                                    <span className="text-sm font-demi text-gray-500">
                                      {entry.company}
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* =================================================================
                  LOOKS 5–12 (LOGO-ON-PROJECT & CLEAN WHITE/GRAY/YELLOW VARIATIONS)
                 ================================================================= */}
              {EXTRA_DESIGN_OPTIONS.some((opt) => opt.id === activeLook) && (
                <ProjectsDesignLabExtra
                  activeLook={activeLook as ExtraDesignVariant}
                  baseYears={baseYears}
                  allYears={projectYears}
                  clientLogos={clientLogos}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
