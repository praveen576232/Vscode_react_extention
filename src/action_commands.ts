import * as vscode from 'vscode';

export class CompleteAction  implements vscode.CodeActionProvider{
	provideCodeActions(document: vscode.TextDocument, range: vscode.Selection | vscode.Range, context: vscode.CodeActionContext, token: vscode.CancellationToken): vscode.ProviderResult<(vscode.CodeAction | vscode.Command)[]> {
		return [
			{
				"command": "react-easy-snippet.wrapDiv",
				"title": "Wrap Div Element"
				
			
			},
			{
				"command": "react-easy-snippet.wrapSpan",
				"title": "Wrap span Element"
			
			},
			{
				"command": "react-easy-snippet.wrapParagraph",
				"title": "Wrap Paragraph Element"
			
			},
			{
				"command": "react-easy-snippet.wrapHeader",
				"title": "Wrap Header Element"
			
			},
			{
				"command": "react-easy-snippet.wrapSection",
				"title": "Wrap Section Element"
			
			},
			{
				"command": "react-easy-snippet.wrapFragment",
				"title": "Wrap Fragment Element"
			
			},
			{
				"command": "react-easy-snippet.wrapElement",
				"title": "Wrap Element"
			
			}
		]
	}
	
}