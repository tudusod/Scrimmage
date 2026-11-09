// Dummy data + async "API" layer. Replace the bodies of get* functions with
// fetch(`${process.env.API_URL}/api/...`) calls to your Node/Express/Mongo backend.

export type District = { id: string; name: string; activeTeams: number };

export type MatchStatus = "split" | "hosting";

export type Match = {
  id: string;
  team: string;
  school: string;
  grade: string;
  district: string;
  venue: string;
  whenLabel: string; // backend should send ISO startsAt; format on the client/server
  status: MatchStatus;
};

export const GRADES = ["7-9-р анги", "10-12-р анги"] as const;
export const DATE_OPTIONS = ["Өнөөдөр", "Маргааш", "Энэ амралтын өдрүүдээр"] as const;

const districts: District[] = [
  { id: "sukhbaatar", name: "Сүхбаатар", activeTeams: 12 },
  { id: "bayangol", name: "Баянгол", activeTeams: 18 },
  { id: "khan-uul", name: "Хан-Уул", activeTeams: 9 },
  { id: "chingeltei", name: "Чингэлтэй", activeTeams: 7 },
  { id: "bayanzurkh", name: "Баянзүрх", activeTeams: 21 },
  { id: "songinokhairkhan", name: "Сонгинохайрхан", activeTeams: 15 },
  { id: "nalaikh", name: "Налайх", activeTeams: 15 },
];

const matches: Match[] = [
  { id: "1", team: "Бүргэд", school: "1-р сургууль", grade: "11-р анги", district: "Сүхбаатар дүүрэг", venue: "Сургуулийн заал", whenLabel: "Өнөөдөр 17:00", status: "hosting" },
  { id: "2", team: "Ирвэс", school: "5-р сургууль", grade: "10-р анги", district: "Баянгол дүүрэг", venue: "Спорт цогцолбор", whenLabel: "Өнөөдөр 19:00", status: "split" },
  { id: "3", team: "Чоно", school: "23-р сургууль", grade: "12-р анги", district: "Хан-Уул дүүрэг", venue: "Сургуулийн заал", whenLabel: "Маргааш 16:30", status: "hosting" },
  { id: "4", team: "Галзуу ухаа", school: "45-р сургууль", grade: "8-р анги", district: "Баянзүрх дүүрэг", venue: "Түрээсийн заал", whenLabel: "Маргааш 18:00", status: "split" },
  { id: "5", team: "Шонхор", school: "11-р сургууль", grade: "9-р анги", district: "Чингэлтэй дүүрэг", venue: "Сургуулийн заал", whenLabel: "Бямба 14:00", status: "hosting" },
  { id: "6", team: "Арслан", school: "74-р сургууль", grade: "11-р анги", district: "Сонгинохайрхан дүүрэг", venue: "Түрээсийн заал", whenLabel: "Ням 15:30", status: "split" },
];

const resolve = <T,>(v: T) => Promise.resolve(v);

export async function getDistricts(): Promise<District[]> {
  return resolve(districts); // GET /api/districts
}

export async function getLatestMatches(): Promise<Match[]> {
  return resolve(matches); // GET /api/matches?sort=latest&limit=6
}

export type MatchFilters = { district?: string; grade?: string; date?: string };

export async function getMatches(f: MatchFilters = {}): Promise<Match[]> {
  // Дараа нь: GET /api/matches?district=..&grade=..&date=..
  const districtName = districts.find((d) => d.id === f.district)?.name;
  const range = f.grade?.match(/\d+/g)?.map(Number); // "10-12-р анги" -> [10, 12]

  return resolve(
    matches.filter((m) => {
      if (districtName && !m.district.startsWith(districtName)) return false;

      if (range) {
        const g = parseInt(m.grade); // "11-р анги" -> 11
        if (g < range[0] || g > range[1]) return false;
      }

      if (f.date === "Энэ амралтын өдрүүдээр") {
        if (!/^(Бямба|Ням)/.test(m.whenLabel)) return false;
      } else if (f.date && !m.whenLabel.startsWith(f.date)) {
        return false;
      }

      return true;
    }),
  );
}