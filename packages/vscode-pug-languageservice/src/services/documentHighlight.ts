import { transformLocations } from '@volar/source-map';
import type * as html from 'vscode-html-languageservice';
import type { Position } from 'vscode-languageserver';
import type { PugDocument } from '../pugDocument';

export function register(htmlLs: html.LanguageService) {
    return (pugDoc: PugDocument, pos: Position) => {

        const htmlRange = pugDoc.sourceMap.getMappedRange(pos);
        if (!htmlRange) return;

        const htmlResult = htmlLs.findDocumentHighlights(
            pugDoc.sourceMap.mappedDocument,
            htmlRange.start,
            pugDoc.htmlDocument,
        );

        return transformLocations(htmlResult, pugDoc.sourceMap);
    }
}
