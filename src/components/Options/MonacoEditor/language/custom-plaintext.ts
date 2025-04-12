import { monaco } from '../monaco/monaco';

export function initCustomPlainTextLanguage(): void {
  monaco.languages.register({ id: 'customPlaintext' });

  monaco.languages.setMonarchTokensProvider('customPlaintext', {
    tokenizer: {
      root: [
        [/^#.*/, 'comment'], // comment token
        [/.*/, 'text'], // plaintext token
      ],
    },
  });
}
