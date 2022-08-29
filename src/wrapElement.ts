import * as vscode from 'vscode';

export function Wrapper(elementName: String) {
    // start div
    let lineNumber = (vscode.window.activeTextEditor?.selection.active!.line ?? 0) - 1;
    let lineEnd = vscode.window.activeTextEditor?.document.lineAt(lineNumber).text.length;
    let pos = new vscode.Position(lineNumber, lineEnd!)
    const editor = new vscode.WorkspaceEdit();
    const document = vscode.window.activeTextEditor?.document;
    editor.insert(document?.uri!, pos, `\n<${elementName}>`)
    // end div
    let element = 0;
    for (let index = (lineNumber + 1); index < (vscode.window.activeTextEditor?.document.lineCount ?? 0); index++) {
        let text = vscode.window.activeTextEditor?.document.getText(new vscode.Range(new vscode.Position(index, 0), new vscode.Position(index + 1, 0)))
        element += countStartElementTag(text ?? "") - countEndElementTag(text ?? "")
        console.log(element, countStartElementTag(text ?? ""), countEndElementTag(text ?? ""));
        if (element === 0) {
            let lineNumber2 = index;
            let lineEnd2 = vscode.window.activeTextEditor?.document.lineAt(lineNumber2).text.length;
            let pos2 = new vscode.Position(lineNumber2, lineEnd2!)
            editor.insert(document?.uri!, pos2, `\n</${elementName}>`)
            vscode.workspace.applyEdit(editor);
            break;
        }
    }
}

export function WrapperElement(editorTab: vscode.TextEditor) {
    let lineNumber = (vscode.window.activeTextEditor?.selection.active!.line ?? 0) - 1;
    let lineEnd = vscode.window.activeTextEditor?.document.lineAt(lineNumber).text.length;
    console.log("line number ",lineNumber);
    console.log("line position ",lineEnd);
    
    
    let pos = new vscode.Position(lineNumber, lineEnd!)    
    const editor = new vscode.WorkspaceEdit();
    const document = vscode.window.activeTextEditor?.document;
    
    let posForCursorStart = new vscode.Position(2, ((lineEnd ?? 0) - 1))
    
    editorTab.selections = [
        new vscode.Selection(posForCursorStart, posForCursorStart),
    ]
    editor.insert(document?.uri!, pos, `\n<>`)
    vscode.workspace.applyEdit(editor);
    // end div
    let element = 0;
    for (let index = (lineNumber + 1); index < (vscode.window.activeTextEditor?.document.lineCount ?? 0); index++) {
        let text = vscode.window.activeTextEditor?.document.getText(new vscode.Range(new vscode.Position(index, 0), new vscode.Position(index + 1, 0)))
        element += countStartElementTag(text ?? "") - countEndElementTag(text ?? "")
        // if (element === 0) {
        //     let lineNumber2 = index;
        //     let lineEnd2 = vscode.window.activeTextEditor?.document.lineAt(lineNumber2).text.length;
        //     let pos2 = new vscode.Position(lineNumber2, lineEnd2!)
        //     editor.insert(document?.uri!, pos2, `\n</>`)
        //     let posForCursorSecondCursor = new vscode.Position(lineNumber2, (lineEnd2 ?? 0) - 1)
        //     vscode.workspace.applyEdit(editor);
        //     editorTab.selections = [...editorTab.selections, new vscode.Selection(posForCursorSecondCursor, posForCursorSecondCursor)]
        //     break;
        // }
    }
}

const countStartElementTag = (text: String) => {
    return text.match(/<[^/]/g)?.length ?? 0
}
const countEndElementTag = (text: String) => {
    return text.match(/(<\s*\/)|(\/\s*>)/g)?.length ?? 0
}
