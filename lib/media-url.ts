export function mediaUrl(keyOrLocalPath: string) {
  if (keyOrLocalPath.startsWith("/media/")) return keyOrLocalPath;
  const key = keyOrLocalPath.startsWith("/assets/")
    ? `site${keyOrLocalPath}`
    : keyOrLocalPath.replace(/^\/+/, "");
  return `/media/${key.split("/").map(encodeURIComponent).join("/")}`;
}

export function storageKeyForLocalPath(localPath: string) {
  return `site/${localPath.replace(/^\/+/, "")}`;
}
