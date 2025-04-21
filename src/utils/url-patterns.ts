interface UrlPatterns {
  stevenBlackHosts: RegExp;
  protocolSubdomain: RegExp;
  trailingSlash: RegExp;
  wildcardStr: string;
  hashCommentStr: string;
  doubleSlashCommentStr: string;
}

export const urlPatterns: Readonly<UrlPatterns> = {
  stevenBlackHosts: /^\s*0\.0\.0\.0\s+/,
  protocolSubdomain: /^(https?:\/\/)?(www\.)?/,
  trailingSlash: /\/$/,
  wildcardStr: '/*',
  hashCommentStr: '#',
  doubleSlashCommentStr: '//',
};
