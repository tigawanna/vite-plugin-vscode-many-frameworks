import { Disposable, ExtensionContext, ViewColumn, WebviewPanel, window } from "vscode";
import { WebviewHelper } from "./helper";

export class MainPanel {
  public static currentPanel: MainPanel | undefined;
  private readonly _panel: WebviewPanel;
  private _disposables: Disposable[] = [];
  private _initialText: string;

  private constructor(panel: WebviewPanel, context: ExtensionContext, initialText: string) {
    this._panel = panel;
    this._initialText = initialText;
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
    this._panel.webview.html = WebviewHelper.setupHtml(this._panel.webview, context);

    WebviewHelper.setupWebviewHooks(this._panel.webview, this._disposables);
  }

  public static render(context: ExtensionContext) {
    const editor = window.activeTextEditor;
    const selection = editor?.selection;
    const selectedText = editor?.document?.getText(selection) || "";
    console.log("=========== seleceted text =============== ",selectedText);
    if (MainPanel.currentPanel) {
      MainPanel.currentPanel._panel.reveal(ViewColumn.One);
    } else {
      const panel = window.createWebviewPanel("showHelloWorld", "Hello World", ViewColumn.One, {
        enableScripts: true,
      });

      MainPanel.currentPanel = new MainPanel(panel, context, selectedText);
    }

    MainPanel.currentPanel._panel.webview.postMessage({ type: "hello", data: "Hello World!" });
    MainPanel.currentPanel._panel.webview.postMessage({ type: "selection", data: selectedText });
  }

  /**
   * Cleans up and disposes of webview resources when the webview panel is closed.
   */
  public dispose() {
    MainPanel.currentPanel = undefined;

    // Dispose of the current webview panel
    this._panel.dispose();

    // Dispose of all disposables (i.e. commands) for the current webview panel
    while (this._disposables.length) {
      const disposable = this._disposables.pop();
      if (disposable) {
        disposable.dispose();
      }
    }
  }
}
