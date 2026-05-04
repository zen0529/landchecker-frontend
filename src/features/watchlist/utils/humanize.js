export const humanize = (str) =>
  str?.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase()) ?? ""
