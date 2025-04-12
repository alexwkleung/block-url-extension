export interface BlockPageMessage {
  action?: 'actionBlockPage';
  trigger: 'triggerErrorPage';
  url: string;
}

export interface TabLoadMessage {
  action: 'tabLoad';
  trigger?: string;
  url: string;
}

export type OnMessagePropsRequestContent = BlockPageMessage | TabLoadMessage;
