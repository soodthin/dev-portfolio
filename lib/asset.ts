export const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (process.env.NODE_ENV === 'production' ? '/dev-portfolio' : '');

/**
 * Returns the correct asset path prefixed with basePath (e.g. /dev-portfolio)
 * when running on GitHub Pages or production static export.
 */
export function getAssetPath(path: string | undefined | null): string {
  if (!path) return '';
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }
  if (basePath && path.startsWith(basePath)) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${cleanPath}`;
}
