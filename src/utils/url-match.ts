import { urlPatterns } from './url-patterns';

const normalizeUrl: (url: string) => string = (url: string): string => {
  // we need to normalize the url to handle different cases:
  // 1. steven black hosts
  // 2. protocols and/or www subdomains
  // 3. traililing slashes
  return url
    .replace(urlPatterns.stevenBlackHosts, '')
    .replace(urlPatterns.protocolSubdomain, '')
    .replace(urlPatterns.trailingSlash, '');
};

const exactUrlMatch = (normalizedUrl: string, validUrls: string[]): boolean => {
  return validUrls.some((pattern: string): boolean => {
    const exactPattern: string = pattern
      .replace(urlPatterns.stevenBlackHosts, '')
      .replace(urlPatterns.protocolSubdomain, '')
      .replace(urlPatterns.trailingSlash, '');

    return exactPattern === normalizedUrl;
  });
};

const wildcardUrlMatch = (normalizedUrl: string, validUrls: string[]): boolean => {
  return validUrls.some((pattern: string): boolean => {
    if (pattern.endsWith(urlPatterns.wildcardStr)) {
      const basePattern = pattern
        .replace(urlPatterns.protocolSubdomain, '')
        .slice(0, -2)
        .replace(urlPatterns.trailingSlash, '');

      return normalizedUrl.startsWith(basePattern);
    }

    return false;
  });
};

const basicExactUrlMatch = (url: string, validUrls: string[]): boolean => {
  return validUrls?.includes(url);
};

const basicWildcardUrlMatch = (url: string, validUrls: string[]): boolean => {
  return validUrls?.some(
    (pattern: string): boolean =>
      pattern.endsWith(urlPatterns.wildcardStr) && url.startsWith(pattern.slice(0, -2))
  );
};

export function urlMatch(url: string, validUrls?: string[]): boolean {
  // validUrls is null or is empty
  if (!validUrls || validUrls.length === 0) return false;

  // normalized url ref
  const normalizedUrl: string = normalizeUrl(url);

  // advanced exact matching
  const exactMatch: boolean = exactUrlMatch(normalizedUrl, validUrls);

  // advanced wildcard matching
  const wildcardMatch = wildcardUrlMatch(normalizedUrl, validUrls);

  // basic exact matching
  const basicExactMatch: boolean = basicExactUrlMatch(url, validUrls);

  // basic wildcard matching
  const basicWildcardMatch: boolean = basicWildcardUrlMatch(url, validUrls);

  return exactMatch || wildcardMatch || basicExactMatch || basicWildcardMatch;
}
