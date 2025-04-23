interface Platform {
  agentPlatform: string;
  platformMac: string[];
  platformWindows: string[];
  platformLinux: string[];
}

export const platform: Platform = {
  agentPlatform: navigator.userAgentData?.platform || navigator.platform,
  platformMac: ['Mac', 'macOS', 'MAC'],
  platformWindows: ['Windows', 'Win32'],
  platformLinux: ['Linux', 'Linux aarch64', 'Linux x86_64'],
};
