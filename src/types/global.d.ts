declare global {
  interface Navigator {
    userAgentData?: {
      platform: string;
    };
    platform: string;
  }
}

export {};
