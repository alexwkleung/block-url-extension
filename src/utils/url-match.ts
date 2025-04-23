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
  return validUrls.some((currUrl: string): boolean => {
    const exactPattern: string = currUrl
      .replace(urlPatterns.stevenBlackHosts, '')
      .replace(urlPatterns.protocolSubdomain, '')
      .replace(urlPatterns.trailingSlash, '');

    return exactPattern === normalizedUrl;
  });
};

const wildcardUrlMatch = (normalizedUrl: string, validUrls: string[]): boolean => {
  return validUrls.some((currUrl: string): boolean => {
    if (currUrl.endsWith(urlPatterns.wildcardStr)) {
      const basePattern = currUrl
        .replace(urlPatterns.protocolSubdomain, '')
        .slice(0, -2)
        .replace(urlPatterns.trailingSlash, '');

      return normalizedUrl.startsWith(basePattern);
    }

    return false;
  });
};

const partialKeywordUrlMatch = (url: string, validUrls: string[]): boolean => {
  return validUrls.some((currUrl: string): boolean => {
    const normalizedCurrUrl: string = normalizeUrl(currUrl);

    const partialKeywordMatch: RegExpMatchArray | null = normalizedCurrUrl.match(
      urlPatterns.partialKeyword
    );

    if (!partialKeywordMatch) return false;

    const currUrlDomain: string = partialKeywordMatch[1].toLowerCase();

    const keywords: string[] = partialKeywordMatch[2]
      .split(',')
      .map((keyword: string) => keyword.trim().toLowerCase());

    const [urlDomain, ...urlPath] = normalizeUrl(url).split('/');
    const onlyUrlPath: string = urlPath.join('/').toLowerCase();

    if (urlDomain !== currUrlDomain) return false;

    return keywords.some((keyword: string): boolean => onlyUrlPath.includes(keyword));
  });
};

const basicExactUrlMatch = (url: string, validUrls: string[]): boolean => {
  return validUrls?.includes(url);
};

const basicWildcardUrlMatch = (url: string, validUrls: string[]): boolean => {
  return validUrls?.some(
    (currUrl: string): boolean =>
      currUrl.endsWith(urlPatterns.wildcardStr) && url.startsWith(currUrl.slice(0, -2))
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
  const wildcardMatch: boolean = wildcardUrlMatch(normalizedUrl, validUrls);

  // partial keyword match (case insensitive)
  const partialKeywordMatch: boolean = partialKeywordUrlMatch(url, validUrls);

  // basic exact matching
  const basicExactMatch: boolean = basicExactUrlMatch(url, validUrls);

  // basic wildcard matching
  const basicWildcardMatch: boolean = basicWildcardUrlMatch(url, validUrls);

  return (
    exactMatch || wildcardMatch || partialKeywordMatch || basicExactMatch || basicWildcardMatch
  );
}
