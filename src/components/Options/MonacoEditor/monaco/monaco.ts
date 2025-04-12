// default api
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';

// only required features
import 'monaco-editor/esm/vs/editor/browser/viewParts/lineNumbers/lineNumbers.js';
import 'monaco-editor/esm/vs/editor/browser/viewParts/linesDecorations/linesDecorations.js';
import 'monaco-editor/esm/vs/editor/contrib/find/browser/findController.js';

// css
import 'monaco-editor/esm/vs/editor/browser/viewParts/lineNumbers/lineNumbers.css';
import 'monaco-editor/esm/vs/editor/browser/viewParts/linesDecorations/linesDecorations.css';
import 'monaco-editor/esm/vs/editor/contrib/find/browser/findWidget.css';

// codicons
import 'monaco-editor/esm/vs/base/browser/ui/codicons/codicon/codicon-modifiers.css';
import 'monaco-editor/esm/vs/base/browser/ui/codicons/codicon/codicon.css';
import 'monaco-editor/esm/vs/base/browser/ui/codicons/codicon/codicon.ttf';

// export stripped down monaco editor
export { monaco };
