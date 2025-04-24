interface Platforms {
  agentPlatform: string;
  platformMac: string[];
  platformWindows: string[];
  platformLinux: string[];
}

interface IsPlatform {
  isMac: boolean;
  isWindows: boolean;
  isLinux: boolean;
}

type Platform = Platforms & IsPlatform;

const platforms: Platforms = {
  agentPlatform: navigator.userAgentData?.platform || navigator.platform,
  platformMac: ['Mac', 'macOS', 'MAC'],
  platformWindows: ['Windows', 'Win32'],
  platformLinux: ['Linux', 'Linux aarch64', 'Linux x86_64'],
};

const isPlatform: IsPlatform = {
  isMac: platforms.platformMac.includes(platforms.agentPlatform),
  isWindows: platforms.platformWindows.includes(platforms.agentPlatform),
  isLinux: platforms.platformLinux.includes(platforms.agentPlatform),
};

export const platform: Platform = {
  ...platforms,
  ...isPlatform,
};
