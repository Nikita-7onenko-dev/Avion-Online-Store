
const HISTORY_LIMIT = 8;

export function getHistory(): string[] {
  const json = localStorage.getItem("recentlyViewed");
  if(!json) return [];
  return JSON.parse(json);
}

export function saveHistory(id: string): void {
  const history = getHistory();
  const newHistory = [
    id, 
    ...history.filter(item => item !== id)
  ].slice(0, HISTORY_LIMIT);
  
  localStorage.setItem("recentlyViewed", JSON.stringify(newHistory));
}