export const getpathArray = (pathname) => {
  return pathname
    .split("/")
    .map((el) => ({
      name:
        el.replaceAll("%20", " ").charAt(0).toUpperCase() +
        el.replaceAll("%20", " ").slice(1),
      link: el,
    }))
    .filter((el) => el.name);
};
