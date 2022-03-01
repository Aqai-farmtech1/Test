export const getPathName = (pathNameList, index) =>
  `/${pathNameList
    .slice(0, index + 1)
    .map((el) => el.link)
    .join("/")}`;

export const getPathArray = (pathname) => {
  const decodedUrl = decodeURI(pathname);
  return decodedUrl
    .split("/")
    .map((el) => ({
      name: el.charAt(0).toUpperCase() + el.slice(1),
      link: el,
    }))
    .filter((el) => el.name);
};
