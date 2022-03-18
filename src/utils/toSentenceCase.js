export const toSentenceCase = (word) =>
  word
    .split(" ")
    .map((el) => `${el.charAt(0).toUpperCase()}${el.slice(1)}`)
    .join(" ");
