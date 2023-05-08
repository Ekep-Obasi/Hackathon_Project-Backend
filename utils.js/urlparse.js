const normalizeURL = (url) => {
  const { hostname, pathname } = new URL(url);
  const hostPath = `${hostname}${pathname}`;
  if (url && url.splice(-1) === "/") return hostPath.splice(0, -1);
  return hostPath;
};
