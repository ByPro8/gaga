import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { buildOptimizedImageUrl } from "../lib/sanity";
import type { CmsClientLogo, CmsProjectYear } from "../types/cms";

export type ExtraDesignVariant =
  | "logo-replaces-name"
  | "logo-and-name-cards"
  | "vertical-timeline"
  | "museum-index"
  | "soft-bento"
  | "live-search"
  | "split-showcase"
  | "a24-focus"
  | "static-cards-corner-logos";

export const EXTRA_DESIGN_OPTIONS: Array<{
  id: ExtraDesignVariant;
  label: string;
}> = [
  { id: "logo-replaces-name", label: "5. Logo Instead of Name" },
  { id: "logo-and-name-cards", label: "6. Logo + Name Cards" },
  { id: "vertical-timeline", label: "7. Soft Timeline" },
  { id: "museum-index", label: "8. Museum Index" },
  { id: "soft-bento", label: "9. Soft Yellow Bento" },
  { id: "live-search", label: "10. Live Search + Chips" },
  { id: "split-showcase", label: "11. Split Client Sidebar" },
  { id: "a24-focus", label: "12. Quiet Hover-Focus" },
  { id: "static-cards-corner-logos", label: "13. Flat Grid + Corner Logos" },
];

interface ExtraLookProps {
  activeLook: ExtraDesignVariant;
  baseYears: CmsProjectYear[];
  allYears: CmsProjectYear[];
  clientLogos: CmsClientLogo[];
}

export function getLogoUrl(client: CmsClientLogo): string {
  const rawUrl = client.logo?.asset?.url || "";
  if (rawUrl.endsWith(".svg")) return rawUrl;
  return buildOptimizedImageUrl(client.logo, { height: 120, quality: 90 });
}

export function matchesClient(
  companyText: string | undefined,
  clientName: string,
): boolean {
  if (!companyText) return false;
  const lower = companyText.toLowerCase();
  const firstWord = clientName.split(" ")[0].toLowerCase();
  if (firstWord === "european") return lower.includes("european union");
  if (firstWord === "free") {
    return lower.includes("free") || lower.includes("agri");
  }
  return lower.includes(firstWord);
}

// Finds all Sanity client logos that match a project's company text
// (e.g. "MenCare, European Union in Georgia, UNFPA Georgia" -> [EU logo, UNFPA logo])
function findLogosForCompany(
  companyText: string | undefined,
  clientLogos: CmsClientLogo[],
): CmsClientLogo[] {
  if (!companyText) return [];
  return clientLogos.filter((client) => matchesClient(companyText, client.name));
}

export default function ProjectsDesignLabExtra({
  activeLook,
  baseYears,
  allYears,
  clientLogos,
}: ExtraLookProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [quickClientChip, setQuickClientChip] = useState<string>("All");
  const [splitActiveClient, setSplitActiveClient] = useState<string | null>(null);
  const [staticGridRole, setStaticGridRole] = useState<string>("All");

  const flatEntries = useMemo(
    () =>
      baseYears.flatMap((yearGroup) =>
        yearGroup.entries.map((entry) => ({
          ...entry,
          yearLabel: yearGroup.yearLabel,
        })),
      ),
    [baseYears],
  );

  const allFlatEntries = useMemo(
    () =>
      allYears.flatMap((yearGroup) =>
        yearGroup.entries.map((entry) => ({
          ...entry,
          yearLabel: yearGroup.yearLabel,
        })),
      ),
    [allYears],
  );

  const searchedEntries = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const source =
      query || quickClientChip !== "All" ? allFlatEntries : flatEntries;

    return source.filter((entry) => {
      const matchesChip =
        quickClientChip === "All" ||
        (entry.company || "")
          .toLowerCase()
          .includes(quickClientChip.toLowerCase());
      if (!matchesChip) return false;
      if (!query) return true;
      return (
        entry.title.toLowerCase().includes(query) ||
        entry.role.toLowerCase().includes(query) ||
        (entry.company || "").toLowerCase().includes(query) ||
        entry.yearLabel.toLowerCase().includes(query)
      );
    });
  }, [allFlatEntries, flatEntries, searchQuery, quickClientChip]);

  const splitYears = useMemo(() => {
    if (!splitActiveClient) return baseYears;
    return allYears
      .map((yearGroup) => ({
        ...yearGroup,
        entries: yearGroup.entries.filter((entry) =>
          matchesClient(entry.company, splitActiveClient),
        ),
      }))
      .filter((yearGroup) => yearGroup.entries.length > 0);
  }, [allYears, baseYears, splitActiveClient]);

  // =========================================================================
  // LOOK 5: LOGO INSTEAD OF COMPANY NAME ON EACH ROW
  // Clean white rows where matching projects display the client's logo directly
  // =========================================================================
  if (activeLook === "logo-replaces-name") {
    return (
      <div className="max-w-[780px] space-y-9">
        {baseYears.map((yearGroup) => (
          <section
            key={yearGroup._id}
            className="border-t border-gray-200/80 pt-6 md:grid md:grid-cols-[105px_1fr] md:gap-8"
          >
            <div className="mb-3 md:mb-0">
              <span className="text-sm tracking-wider text-gray-400">
                {yearGroup.yearLabel}
              </span>
            </div>

            <div className="divide-y divide-gray-100">
              {yearGroup.entries.map((entry) => {
                const matchedLogos = findLogosForCompany(
                  entry.company,
                  clientLogos,
                );

                return (
                  <div
                    key={entry._key}
                    className="flex flex-col justify-between gap-2 py-3.5 first:pt-0 sm:flex-row sm:items-center sm:gap-6"
                  >
                    <div>
                      <h2 className="text-[17px] text-gray-700">
                        {entry.title}
                      </h2>
                      <p className="text-xs text-gray-400">{entry.role}</p>
                    </div>

                    {/* Show logo(s) instead of company text when available; otherwise calm gray text */}
                    <div className="flex shrink-0 items-center gap-3">
                      {matchedLogos.length > 0 ? (
                        matchedLogos.map((client) => {
                          const url = getLogoUrl(client);
                          return url ? (
                            <img
                              key={client._key}
                              src={url}
                              alt={client.name}
                              title={entry.company || client.name}
                              className="h-7 w-auto max-w-[95px] object-contain opacity-90 mix-blend-multiply"
                            />
                          ) : null;
                        })
                      ) : entry.company ? (
                        <span className="text-sm font-demi text-gray-500">
                          {entry.company}
                        </span>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    );
  }

  // =========================================================================
  // LOOK 6: LOGO + COMPANY NAME PAIRED TOGETHER ON CLEAN WHITE CARDS
  // =========================================================================
  if (activeLook === "logo-and-name-cards") {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {flatEntries.map((entry) => {
          const matchedLogos = findLogosForCompany(entry.company, clientLogos);

          return (
            <article
              key={`${entry.yearLabel}-${entry._key}`}
              className="flex flex-col justify-between rounded-xl border border-gray-200/80 bg-white p-5 transition-all duration-200 hover:border-gaga1 hover:shadow-sm"
            >
              <div>
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="rounded-full bg-gaga1/40 px-2.5 py-0.5 text-xs font-demi text-gray-600">
                    {entry.yearLabel}
                  </span>

                  {matchedLogos.length > 0 && (
                    <div className="flex items-center gap-2">
                      {matchedLogos.map((client) => {
                        const url = getLogoUrl(client);
                        return url ? (
                          <img
                            key={client._key}
                            src={url}
                            alt={client.name}
                            title={client.name}
                            className="h-6 w-auto max-w-[80px] object-contain mix-blend-multiply"
                          />
                        ) : null;
                      })}
                    </div>
                  )}
                </div>

                <h2 className="text-lg leading-snug text-gray-700">
                  {entry.title}
                </h2>
              </div>

              <div className="mt-4 flex flex-wrap items-baseline justify-between gap-2 border-t border-gray-100 pt-3 text-xs">
                <span className="text-gray-400">{entry.role}</span>
                {entry.company && (
                  <span className="font-demi text-gray-500">
                    {entry.company}
                  </span>
                )}
              </div>
            </article>
          );
        })}
      </div>
    );
  }

  // =========================================================================
  // LOOK 7: SOFT VERTICAL TIMELINE (WHITE + GRAY + WARM YELLOW)
  // =========================================================================
  if (activeLook === "vertical-timeline") {
    return (
      <div className="relative pl-8 sm:pl-10">
        <div className="absolute bottom-2 left-3 top-2 w-[2px] bg-gradient-to-b from-gaga1 via-gray-200 to-transparent" />

        <div className="space-y-9">
          {baseYears.map((yearGroup) => (
            <section key={yearGroup._id} className="relative">
              <span className="absolute -left-[26px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-gaga1/60 sm:-left-[34px]">
                <span className="h-2 w-2 rounded-full bg-gaga" />
              </span>

              <h2 className="mb-3 text-base font-demi tracking-wider text-gray-500">
                {yearGroup.yearLabel}
              </h2>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {yearGroup.entries.map((entry) => {
                  const matchedLogos = findLogosForCompany(
                    entry.company,
                    clientLogos,
                  );

                  return (
                    <div
                      key={entry._key}
                      className="rounded-xl border border-gray-200/70 bg-white p-4 transition-all hover:border-gaga1 hover:bg-[#FFFDF7]"
                    >
                      <p className="text-[16px] text-gray-700">{entry.title}</p>
                      <div className="mt-2.5 flex items-center justify-between gap-2 text-xs">
                        <span className="text-gray-400">{entry.role}</span>
                        <div className="flex items-center gap-2">
                          {matchedLogos[0] && (
                            <img
                              src={getLogoUrl(matchedLogos[0])}
                              alt={matchedLogos[0].name}
                              className="h-4 w-auto max-w-[50px] object-contain mix-blend-multiply"
                            />
                          )}
                          {entry.company && (
                            <span className="font-demi text-gray-500">
                              {entry.company}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    );
  }

  // =========================================================================
  // LOOK 8: MUSEUM EXHIBITION INDEX (NUMBERED + DOTTED LEADERS + TINY LOGOS)
  // =========================================================================
  if (activeLook === "museum-index") {
    let runningNumber = 1;
    return (
      <div className="max-w-[780px] space-y-10">
        {baseYears.map((yearGroup) => (
          <div key={yearGroup._id}>
            <div className="mb-4 flex items-center gap-4">
              <span className="text-xs font-demi uppercase tracking-[0.22em] text-gray-500">
                {yearGroup.yearLabel}
              </span>
              <span className="h-px flex-1 bg-gray-200/80" />
            </div>

            <div className="space-y-4">
              {yearGroup.entries.map((entry) => {
                const indexLabel = String(runningNumber++).padStart(2, "0");
                const matchedLogos = findLogosForCompany(
                  entry.company,
                  clientLogos,
                );

                return (
                  <div key={entry._key} className="group">
                    <div className="flex items-center gap-3">
                      <span className="w-6 shrink-0 text-xs text-gray-300 transition-colors group-hover:text-gaga">
                        {indexLabel}
                      </span>
                      <span className="text-[17px] text-gray-700">
                        {entry.title}
                      </span>
                      <span className="hidden flex-1 border-b border-dotted border-gray-300 sm:inline-block" />
                      <div className="flex shrink-0 items-center gap-2">
                        {matchedLogos[0] && (
                          <img
                            src={getLogoUrl(matchedLogos[0])}
                            alt={matchedLogos[0].name}
                            className="h-5 w-auto max-w-[60px] object-contain opacity-85 mix-blend-multiply"
                          />
                        )}
                        {entry.company && (
                          <span className="text-sm text-gray-500">
                            {entry.company}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="pl-9 text-xs text-gray-400">{entry.role}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // =========================================================================
  // LOOK 9: SOFT BENTO GRID (100% WHITE + SOFT GRAY + WARM YELLOW — ZERO BLACK)
  // =========================================================================
  if (activeLook === "soft-bento") {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
        {/* Clean full-width logos bar tile */}
        {clientLogos.length > 0 && (
          <div className="flex flex-col justify-between rounded-2xl border border-gray-200/80 bg-[#FAFAFA] p-5 sm:col-span-6">
            <span className="mb-3 text-[11px] uppercase tracking-[0.2em] text-gray-400">
              Selected Partners
            </span>
            <div className="flex flex-wrap items-center gap-6">
              {clientLogos.map((client) => {
                const url = getLogoUrl(client);
                return url ? (
                  <img
                    key={client._key}
                    src={url}
                    alt={client.name}
                    title={client.name}
                    className="h-7 w-auto max-w-[95px] object-contain opacity-85 mix-blend-multiply transition-opacity hover:opacity-100"
                  />
                ) : null;
              })}
            </div>
          </div>
        )}

        {/* Alternating wide soft-yellow-tinted + compact white tiles */}
        {flatEntries.map((entry, idx) => {
          const isWide = idx % 3 === 0;
          const matchedLogos = findLogosForCompany(entry.company, clientLogos);

          return (
            <div
              key={`${entry.yearLabel}-${entry._key}`}
              className={`flex flex-col justify-between rounded-2xl border p-5 transition-all hover:border-gaga ${
                isWide
                  ? "border-gaga1/60 bg-gaga1/20 sm:col-span-4"
                  : "border-gray-200/80 bg-white sm:col-span-2"
              }`}
            >
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="font-demi text-gray-500">
                  {entry.yearLabel}
                </span>
                {matchedLogos[0] && (
                  <img
                    src={getLogoUrl(matchedLogos[0])}
                    alt={matchedLogos[0].name}
                    className="h-5 w-auto max-w-[70px] object-contain mix-blend-multiply"
                  />
                )}
              </div>
              <div className="mt-5">
                <h2 className="text-lg leading-snug text-gray-700">
                  {entry.title}
                </h2>
                <p className="mt-1 text-xs text-gray-400">
                  {entry.role}
                  {entry.company ? (
                    <span className="font-demi text-gray-500">
                      {" "}
                      · {entry.company}
                    </span>
                  ) : null}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // =========================================================================
  // LOOK 10: LIVE SEARCH + SOFT CLIENT CHIPS (PLAIN WHITE & YELLOW)
  // =========================================================================
  if (activeLook === "live-search") {
    const quickChips = [
      "All",
      "UNFPA",
      "UNDP",
      "WHO",
      "USAID",
      "European Union",
      "Free",
      "Bolt",
      "MenCare",
    ];

    return (
      <div className="max-w-[760px]">
        <div className="relative mb-4">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by title, role, client, or year..."
            className="w-full rounded-xl border border-gray-200 bg-[#FAFAFA] py-3 pl-11 pr-4 text-sm text-gray-700 placeholder-gray-400 transition-colors focus:border-gaga focus:bg-white focus:outline-none"
          />
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {quickChips.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => setQuickClientChip(chip)}
              className={`rounded-full border px-3.5 py-1 text-xs transition-colors focus:outline-none ${
                quickClientChip === chip
                  ? "border-gaga bg-gaga1/50 font-demi text-gray-700"
                  : "border-gray-200 bg-white text-gray-500 hover:border-gaga1"
              }`}
            >
              {chip}
            </button>
          ))}
        </div>

        <div className="divide-y divide-gray-100 border-t border-gray-200/80">
          {searchedEntries.map((entry) => {
            const matchedLogos = findLogosForCompany(entry.company, clientLogos);
            return (
              <div
                key={`${entry.yearLabel}-${entry._key}`}
                className="flex flex-col justify-between gap-2 py-3.5 transition-colors hover:bg-[#FFFDF7] sm:flex-row sm:items-center"
              >
                <div>
                  <span className="mr-3 inline-block w-20 text-xs text-gray-400">
                    {entry.yearLabel}
                  </span>
                  <span className="text-base text-gray-700">{entry.title}</span>
                  <span className="ml-2 text-xs text-gray-400">
                    · {entry.role}
                  </span>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {matchedLogos[0] && (
                    <img
                      src={getLogoUrl(matchedLogos[0])}
                      alt={matchedLogos[0].name}
                      className="h-5 w-auto max-w-[60px] object-contain mix-blend-multiply"
                    />
                  )}
                  {entry.company && (
                    <span className="text-xs font-demi text-gray-500">
                      {entry.company}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // =========================================================================
  // LOOK 11: SPLIT STICKY CLIENT LOGO PANEL + SCROLLING CREDITS
  // =========================================================================
  if (activeLook === "split-showcase") {
    return (
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[235px_1fr]">
        <aside className="md:sticky md:top-6 md:self-start">
          <div className="rounded-xl border border-gray-200/80 bg-[#FAFAFA] p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.18em] text-gray-400">
                Clients
              </span>
              {splitActiveClient && (
                <button
                  type="button"
                  onClick={() => setSplitActiveClient(null)}
                  className="border-0 bg-transparent p-0 text-xs text-gray-500 underline hover:text-gray-800 focus:outline-none"
                >
                  Show all
                </button>
              )}
            </div>

            <div className="space-y-1.5">
              {clientLogos.map((client) => {
                const url = getLogoUrl(client);
                const isSelected = splitActiveClient === client.name;
                return (
                  <button
                    key={client._key}
                    type="button"
                    onClick={() =>
                      setSplitActiveClient(isSelected ? null : client.name)
                    }
                    className={`flex w-full items-center gap-3 rounded-lg border px-3 py-2 text-left transition-all focus:outline-none ${
                      isSelected
                        ? "border-gaga bg-gaga1/25 text-gray-800"
                        : "border-transparent bg-transparent text-gray-500 hover:bg-white"
                    }`}
                  >
                    {url && (
                      <img
                        src={url}
                        alt={client.name}
                        className="h-5 w-7 shrink-0 object-contain mix-blend-multiply"
                      />
                    )}
                    <span className="truncate text-xs">{client.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        <div className="space-y-7">
          {splitYears.map((yearGroup) => (
            <div key={yearGroup._id}>
              <h3 className="mb-3 border-b border-gray-200/80 pb-1 text-xs uppercase tracking-widest text-gray-400">
                {yearGroup.yearLabel}
              </h3>
              <div className="space-y-3.5">
                {yearGroup.entries.map((entry) => (
                  <div key={entry._key}>
                    <div className="text-[17px] text-gray-700">
                      {entry.title}
                    </div>
                    <div className="text-xs text-gray-400">
                      {entry.role}
                      {entry.company ? (
                        <span className="font-demi text-gray-500">
                          {" "}
                          · {entry.company}
                        </span>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // =========================================================================
  // LOOK 13: FLAT EDITORIAL GRID + CORNER LOGOS (LIKE #2, ZERO CLICKABLE FEEL)
  // Static printed-catalog feel: no hover lift, no hover border, no shadow
  // =========================================================================
  if (activeLook === "static-cards-corner-logos") {
    const roleOptions = [
      "All",
      "Director",
      "Producer",
      "Cameraman",
      "Photographer",
    ];
    const filteredByRole =
      staticGridRole === "All"
        ? flatEntries
        : flatEntries.filter((entry) =>
            entry.role.toLowerCase().includes(staticGridRole.toLowerCase()),
          );

    return (
      <div>
        {/* Calm role filter tabs */}
        <div className="mb-7 flex flex-wrap gap-2">
          {roleOptions.map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => setStaticGridRole(role)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors focus:outline-none ${
                staticGridRole === role
                  ? "border-gaga bg-gaga1/50 font-demi text-gray-700"
                  : "border-gray-200 bg-white text-gray-500 hover:border-gaga1 hover:text-gray-700"
              }`}
            >
              {role}
            </button>
          ))}
        </div>

        {/* Non-clickable flat editorial credit blocks with logo + company in the top-right corner */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          {filteredByRole.map((entry) => {
            const matchedLogos = findLogosForCompany(
              entry.company,
              clientLogos,
            );

            return (
              <article
                key={`${entry.yearLabel}-${entry._key}`}
                className="flex flex-col justify-between border-t border-gray-200/90 bg-[#FAFAFA]/70 px-5 py-5"
              >
                <div>
                  {/* Top row: Year on left, Client Logo + Company Name paired cleanly in top-right corner */}
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <span className="inline-flex shrink-0 items-center gap-1.5 pt-0.5 text-xs font-demi tracking-wider text-gray-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-gaga" />
                      {entry.yearLabel}
                    </span>

                    {(matchedLogos.length > 0 || entry.company) && (
                      <div className="flex flex-wrap items-center justify-end gap-2 text-right">
                        {matchedLogos.map((client) => {
                          const url = getLogoUrl(client);
                          return url ? (
                            <img
                              key={client._key}
                              src={url}
                              alt={client.name}
                              title={client.name}
                              className="h-5 w-auto max-w-[68px] object-contain opacity-90 mix-blend-multiply"
                            />
                          ) : null;
                        })}
                        {entry.company && (
                          <span className="text-xs font-demi text-gray-500">
                            {entry.company}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Project title */}
                  <h2 className="text-lg leading-snug text-gray-700">
                    {entry.title}
                  </h2>
                </div>

                {/* Plain editorial role text (no pill button feel) */}
                {entry.role && (
                  <p className="mt-4 text-xs tracking-wide text-gray-400">
                    {entry.role}
                  </p>
                )}
              </article>
            );
          })}
        </div>
      </div>
    );
  }

  // =========================================================================
  // LOOK 12: QUIET HOVER-FOCUS LIST + INLINE CLIENT LOGO
  // Ultra-calm white gallery list: hover one row to softly dim the others
  // =========================================================================
  return (
    <div className="max-w-[780px]">
      <div className="group/list divide-y divide-gray-100 border-t border-gray-200/80">
        {flatEntries.map((entry) => {
          const matchedLogos = findLogosForCompany(entry.company, clientLogos);
          return (
            <div
              key={`${entry.yearLabel}-${entry._key}`}
              className="flex flex-col gap-1.5 py-4 transition-all duration-300 group-hover/list:opacity-35 hover:!opacity-100 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-baseline gap-4">
                <span className="w-16 shrink-0 text-xs tracking-wider text-gray-400">
                  {entry.yearLabel}
                </span>
                <div>
                  <h2 className="text-lg font-normal text-gray-700">
                    {entry.title}
                  </h2>
                  <p className="text-xs text-gray-400">{entry.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pl-20 sm:pl-0">
                {matchedLogos[0] && (
                  <img
                    src={getLogoUrl(matchedLogos[0])}
                    alt={matchedLogos[0].name}
                    className="h-6 w-auto max-w-[75px] object-contain mix-blend-multiply"
                  />
                )}
                {entry.company && (
                  <span className="text-sm text-gray-500 sm:text-right">
                    {entry.company}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
