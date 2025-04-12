const normalizeUrl: (url: string) => string = (url: string): string => {
  // we need to normalize the url to handle different cases:
  // 1. steven black hosts
  // 2. protocols and/or www subdomains
  // 3. traililing slashes
  return url
    .replace(/^\s*0\.0\.0\.0\s+/, '')
    .replace(/^(https?:\/\/)?(www\.)?/, '')
    .replace(/\/$/, '');
};

export function urlMatch(url: string, validUrls?: string[]): boolean {
  // validUrls is null or is empty
  if (!validUrls || validUrls.length === 0) return false;

  // normalized url ref
  const normalizedUrl: string = normalizeUrl(url);

  // advanced exact matching
  const exactMatch: boolean = validUrls.some((pattern: string): boolean => {
    const exactPattern: string = pattern
      .replace(/^\s*0\.0\.0\.0\s+/, '')
      .replace(/^(https?:\/\/)?(www\.)?/, '')
      .replace(/\/$/, '');

    return exactPattern === normalizedUrl;
  });

  // advanced wildcard matching
  const wildcardMatch = validUrls.some((pattern: string): boolean => {
    if (pattern.endsWith('/*')) {
      const basePattern = pattern
        .replace(/^(https?:\/\/)?(www\.)?/, '')
        .slice(0, -2)
        .replace(/\/$/, '');

      return normalizedUrl.startsWith(basePattern);
    }

    return false;
  });

  // basic exact matching
  const basicExactMatch: boolean = validUrls?.includes(url);

  // basic wildcard matching
  const basicWildcardMatch: boolean = validUrls?.some(
    (pattern: string): boolean => pattern.endsWith('/*') && url.startsWith(pattern.slice(0, -2))
  );

  return exactMatch || wildcardMatch || basicExactMatch || basicWildcardMatch;
}
