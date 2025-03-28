import { monaco } from './monaco';
import { themeData } from '../theme/theme';

export function initMonacoTheme(): void {
  monaco.editor.defineTheme('default', themeData);
  monaco.editor.setTheme('default');
}
