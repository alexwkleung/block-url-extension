import urlRegexSafe from 'url-regex-safe';

export function isValidUrl(url: string): boolean {
  // test the given url is valid against urlRegexSafe pattern
  const isUrl: boolean = urlRegexSafe().test(url);

  if (isUrl) {
    return true;
  }

  return false;
}
