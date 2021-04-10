import type * as html from 'vscode-html-languageservice';
import type { TextDocument } from 'vscode-languageserver-textdocument';
import { parsePugDocument } from './pugDocument';
import { register as registerCompletion } from './services/completion';
import { register as registerDocumentHighlight } from './services/documentHighlight';
import { register as registerDocumentLinks } from './services/documentLinks';
import { register as registerFormatting } from './services/formatting';
import { register as registerHover } from './services/hover';
import { register as registerScanner } from './services/scanner';
import { register as registerSelectRanges } from './services/selectRanges';

export { PugDocument } from './pugDocument';

export type LanguageService = ReturnType<typeof getLanguageService>;

export function getLanguageService(htmlLs: html.LanguageService) {
    return {
        parsePugDocument: (doc: TextDocument) => parsePugDocument(doc, htmlLs),
        doComplete: registerCompletion(htmlLs),
        findDocumentHighlights: registerDocumentHighlight(htmlLs),
        findDocumentLinks: registerDocumentLinks(htmlLs),
        format: registerFormatting(),
        doHover: registerHover(htmlLs),
        createScanner: registerScanner(htmlLs),
        getSelectionRanges: registerSelectRanges(htmlLs),
    };
}
