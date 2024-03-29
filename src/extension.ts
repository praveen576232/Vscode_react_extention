import * as vscode from 'vscode';
import * as fs from 'fs'
import * as path from 'path'
import { Wrapper, WrapperElement } from './wrapElement';
import { CompleteAction } from './action_commands';
export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('react-easy-snippet.Es6_react_file_create', () => {
		const folder = vscode.workspace.workspaceFolders;

		if (folder) {

			let tempfolder = folder[0].uri.path
			const mypath = tempfolder.substring(1, tempfolder.length)


			try {

				vscode.window.showInputBox({
					placeHolder: 'Filename or Folder_name/Filename ',
					prompt: 'Note:your are in src directory', // An indication of what to do
					value: '' // A value by default. In this case leave it empty
				}).then(async value => {

					if (value) {
						const fileinfo = fileNameFormater(value)
						if (fileinfo) {

							const filename = fileinfo.filename
							const error_msg = `A file or folder ${filename} is already exists at this location. Please choose a different name.`
							const text = `import React from 'react'
import './${filename}.css'
		  
function ${filename}() {
    return (
		<div className="${filename.toLowerCase()}">
					  
		</div>
	)
}
		  
export default ${filename}
		  `

							if (fileinfo.file_path != null || undefined) {

								if (!fs.existsSync(path.join(mypath, `src/${fileinfo.file_path}`))) {
									fs.mkdirSync(path.join(mypath, `src/${fileinfo.file_path}`), { recursive: true })

									fs.writeFileSync(path.join(mypath, `src/${fileinfo.file_path}`, fileinfo.filename_extention), text)
									fs.writeFileSync(path.join(mypath, `src/${fileinfo.file_path}`, `${filename}.css`), '')

									openTab(path.join(mypath, `src/${fileinfo.file_path}`, fileinfo.filename_extention))
								} else {
									const createdJSFilePath = path.join(mypath, `src/${fileinfo.file_path}`, fileinfo.filename_extention)
									const createdCSSFilePath = path.join(mypath, `src/${fileinfo.file_path}`, `${filename}.css`)



									if (fs.existsSync(createdJSFilePath)) {
										vscode.window.showErrorMessage(error_msg)
									}
									else {
										fs.writeFileSync(createdJSFilePath, text)


										openTab(createdJSFilePath)
									}
									if (fs.existsSync(createdCSSFilePath)) {
										vscode.window.showErrorMessage(error_msg)
									} else {
										fs.writeFileSync(createdCSSFilePath, " ")
									}
								}




							} else {




								const createdJSFilePath = path.join(mypath, 'src', fileinfo.filename_extention)
								const createdCSSFilePath = path.join(mypath, 'src', `${filename}.css`)




								if (fs.existsSync(createdJSFilePath)) {
									vscode.window.showErrorMessage(error_msg)
								}
								else {
									fs.writeFileSync(createdJSFilePath, text)


									openTab(createdJSFilePath)
								}
								if (fs.existsSync(createdCSSFilePath)) {
									vscode.window.showErrorMessage(error_msg)
								} else {
									fs.writeFileSync(createdCSSFilePath, "")
								}

							}
						}

					}
				});

			} catch (e) {
				vscode.window.showErrorMessage("Something went wrong!")

			}


		}

	});
	let cmd2 = vscode.commands.registerTextEditorCommand('react-easy-snippet.refactor', (editor) => {
		let pos = new vscode.Position(2,0);
		let pos2 = new vscode.Position(2,0);
		let pos11 = new vscode.Position(5,0);
		let pos22 = new vscode.Position(5,0);
		editor.selections = [
			new vscode.Selection(pos,pos2),
			new vscode.Selection(pos11,pos22),
		]
	})
	context.subscriptions.push(disposable);
	context.subscriptions.push(cmd2);

	context.subscriptions.push(vscode.languages.registerCodeActionsProvider({ pattern: '**/*.*' }, new CompleteAction()));
    vscode.commands.registerCommand('react-easy-snippet.wrapDiv',()=>Wrapper("div"))
    vscode.commands.registerCommand('react-easy-snippet.wrapSpan',()=>Wrapper("span"))
    vscode.commands.registerCommand('react-easy-snippet.wrapParagraph',()=>Wrapper("p"))
    vscode.commands.registerCommand('react-easy-snippet.wrapHeader',()=>Wrapper("h1"))
    vscode.commands.registerCommand('react-easy-snippet.wrapSection',()=>Wrapper("section"))
    vscode.commands.registerCommand('react-easy-snippet.wrapFragment',()=>Wrapper(""))
    // vscode.commands.registerTextEditorCommand('react-easy-snippet.wrapElement',WrapperElement)
}




const fileNameFormater = (val: any) => {
	const inputes = val.split("/")
	interface obj {
		[key: string]: any
	}
	var finalobj: obj = {}
	if (inputes) {
		if (inputes.length == 1) {

			if (val.endsWith(".js")) {

				finalobj.filename = val.replace(".js", "")
				finalobj.filename_extention = val

			} else {
				finalobj.filename = val
				finalobj.filename_extention = val + ".js"

			}
		} else {

			const filename = inputes[inputes.length - 1]


			var filepath = ""
			inputes.map((input: any, index: any) => {
				if (!(index == inputes.length - 1)) {
					if (index == inputes.length - 2) {
						filepath += input
					} else {
						filepath += input + "/"
					}

				}
			})
			if (filename.endsWith(".js")) {
				finalobj.filename = filename.replace(".js", "")
				finalobj.filename_extention = filename

			} else {
				finalobj.filename = filename
				finalobj.filename_extention = filename + ".js"

			}
			finalobj.file_path = filepath

		}
		return finalobj
	}
}

const openTab = async (path: string,) => {
	if (path) {

		let uri = vscode.Uri.file(path)
		await vscode.window.showTextDocument(uri, { preview: false });
	}
}

const checkFileExist = (path: string) => {
	return fs.existsSync(path)
}
const createNewFile = (path: string) => {

}
export function deactivate() { }




