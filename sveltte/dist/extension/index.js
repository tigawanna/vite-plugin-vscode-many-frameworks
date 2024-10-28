"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// extension/index.ts
var extension_exports = {};
__export(extension_exports, {
  activate: () => activate,
  deactivate: () => deactivate
});
module.exports = __toCommonJS(extension_exports);
var import_vscode3 = require("vscode");

// extension/views/panel.ts
var import_vscode2 = require("vscode");

// extension/views/helper.ts
var import_webview = __toESM(require("@tomjs/vite-plugin-vscode/webview"));
var import_vscode = require("vscode");
var WebviewHelper = class {
  static setupHtml(webview, context) {
    return "http://localhost:5174/" ? (0, import_webview.default)("http://localhost:5174/") : (0, import_webview.default)(webview, context);
  }
  static setupWebviewHooks(webview, disposables) {
    webview.onDidReceiveMessage(
      (message) => {
        const type = message.type;
        const data = message.data;
        console.log(`type: ${type}`);
        switch (type) {
          case "hello":
            import_vscode.window.showInformationMessage(data);
            return;
        }
      },
      void 0,
      disposables
    );
  }
};

// extension/views/panel.ts
var _MainPanel = class _MainPanel {
  constructor(panel, context, initialText) {
    __publicField(this, "_panel");
    __publicField(this, "_disposables", []);
    __publicField(this, "_initialText");
    this._panel = panel;
    this._initialText = initialText;
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
    this._panel.webview.html = WebviewHelper.setupHtml(this._panel.webview, context);
    WebviewHelper.setupWebviewHooks(this._panel.webview, this._disposables);
  }
  static render(context) {
    var _a;
    const editor = import_vscode2.window.activeTextEditor;
    const selection = editor == null ? void 0 : editor.selection;
    const selectedText = ((_a = editor == null ? void 0 : editor.document) == null ? void 0 : _a.getText(selection)) || "";
    console.log("=========== seleceted text =============== ", selectedText);
    if (_MainPanel.currentPanel) {
      _MainPanel.currentPanel._panel.reveal(import_vscode2.ViewColumn.One);
    } else {
      const panel = import_vscode2.window.createWebviewPanel("showHelloWorld", "Hello World", import_vscode2.ViewColumn.One, {
        enableScripts: true
      });
      _MainPanel.currentPanel = new _MainPanel(panel, context, selectedText);
    }
    _MainPanel.currentPanel._panel.webview.postMessage({ type: "hello", data: "Hello World!" });
    _MainPanel.currentPanel._panel.webview.postMessage({ type: "selection", data: selectedText });
  }
  /**
   * Cleans up and disposes of webview resources when the webview panel is closed.
   */
  dispose() {
    _MainPanel.currentPanel = void 0;
    this._panel.dispose();
    while (this._disposables.length) {
      const disposable = this._disposables.pop();
      if (disposable) {
        disposable.dispose();
      }
    }
  }
};
__publicField(_MainPanel, "currentPanel");
var MainPanel = _MainPanel;

// extension/index.ts
function activate(context) {
  context.subscriptions.push(
    import_vscode3.commands.registerCommand("hello-world.showHelloWorld", async () => {
      MainPanel.render(context);
    })
  );
}
function deactivate() {
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate,
  deactivate
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vZXh0ZW5zaW9uL2luZGV4LnRzIiwgIi4uLy4uL2V4dGVuc2lvbi92aWV3cy9wYW5lbC50cyIsICIuLi8uLi9leHRlbnNpb24vdmlld3MvaGVscGVyLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBjb21tYW5kcywgRXh0ZW5zaW9uQ29udGV4dCB9IGZyb20gJ3ZzY29kZSc7XG5pbXBvcnQgeyBNYWluUGFuZWwgfSBmcm9tICcuL3ZpZXdzL3BhbmVsJztcblxuZXhwb3J0IGZ1bmN0aW9uIGFjdGl2YXRlKGNvbnRleHQ6IEV4dGVuc2lvbkNvbnRleHQpIHtcbiAgLy8gQWRkIGNvbW1hbmQgdG8gdGhlIGV4dGVuc2lvbiBjb250ZXh0XG4gIGNvbnRleHQuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgIGNvbW1hbmRzLnJlZ2lzdGVyQ29tbWFuZCgnaGVsbG8td29ybGQuc2hvd0hlbGxvV29ybGQnLCBhc3luYyAoKSA9PiB7XG4gICAgICBNYWluUGFuZWwucmVuZGVyKGNvbnRleHQpO1xuICAgIH0pLFxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVhY3RpdmF0ZSgpIHt9XG4iLCAiaW1wb3J0IHsgRGlzcG9zYWJsZSwgRXh0ZW5zaW9uQ29udGV4dCwgVmlld0NvbHVtbiwgV2Vidmlld1BhbmVsLCB3aW5kb3cgfSBmcm9tIFwidnNjb2RlXCI7XG5pbXBvcnQgeyBXZWJ2aWV3SGVscGVyIH0gZnJvbSBcIi4vaGVscGVyXCI7XG5cbmV4cG9ydCBjbGFzcyBNYWluUGFuZWwge1xuICBwdWJsaWMgc3RhdGljIGN1cnJlbnRQYW5lbDogTWFpblBhbmVsIHwgdW5kZWZpbmVkO1xuICBwcml2YXRlIHJlYWRvbmx5IF9wYW5lbDogV2Vidmlld1BhbmVsO1xuICBwcml2YXRlIF9kaXNwb3NhYmxlczogRGlzcG9zYWJsZVtdID0gW107XG4gIHByaXZhdGUgX2luaXRpYWxUZXh0OiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihwYW5lbDogV2Vidmlld1BhbmVsLCBjb250ZXh0OiBFeHRlbnNpb25Db250ZXh0LCBpbml0aWFsVGV4dDogc3RyaW5nKSB7XG4gICAgdGhpcy5fcGFuZWwgPSBwYW5lbDtcbiAgICB0aGlzLl9pbml0aWFsVGV4dCA9IGluaXRpYWxUZXh0O1xuICAgIHRoaXMuX3BhbmVsLm9uRGlkRGlzcG9zZSgoKSA9PiB0aGlzLmRpc3Bvc2UoKSwgbnVsbCwgdGhpcy5fZGlzcG9zYWJsZXMpO1xuICAgIHRoaXMuX3BhbmVsLndlYnZpZXcuaHRtbCA9IFdlYnZpZXdIZWxwZXIuc2V0dXBIdG1sKHRoaXMuX3BhbmVsLndlYnZpZXcsIGNvbnRleHQpO1xuXG4gICAgV2Vidmlld0hlbHBlci5zZXR1cFdlYnZpZXdIb29rcyh0aGlzLl9wYW5lbC53ZWJ2aWV3LCB0aGlzLl9kaXNwb3NhYmxlcyk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIHJlbmRlcihjb250ZXh0OiBFeHRlbnNpb25Db250ZXh0KSB7XG4gICAgY29uc3QgZWRpdG9yID0gd2luZG93LmFjdGl2ZVRleHRFZGl0b3I7XG4gICAgY29uc3Qgc2VsZWN0aW9uID0gZWRpdG9yPy5zZWxlY3Rpb247XG4gICAgY29uc3Qgc2VsZWN0ZWRUZXh0ID0gZWRpdG9yPy5kb2N1bWVudD8uZ2V0VGV4dChzZWxlY3Rpb24pIHx8IFwiXCI7XG4gICAgY29uc29sZS5sb2coXCI9PT09PT09PT09PSBzZWxlY2V0ZWQgdGV4dCA9PT09PT09PT09PT09PT0gXCIsc2VsZWN0ZWRUZXh0KTtcbiAgICBpZiAoTWFpblBhbmVsLmN1cnJlbnRQYW5lbCkge1xuICAgICAgTWFpblBhbmVsLmN1cnJlbnRQYW5lbC5fcGFuZWwucmV2ZWFsKFZpZXdDb2x1bW4uT25lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcGFuZWwgPSB3aW5kb3cuY3JlYXRlV2Vidmlld1BhbmVsKFwic2hvd0hlbGxvV29ybGRcIiwgXCJIZWxsbyBXb3JsZFwiLCBWaWV3Q29sdW1uLk9uZSwge1xuICAgICAgICBlbmFibGVTY3JpcHRzOiB0cnVlLFxuICAgICAgfSk7XG5cbiAgICAgIE1haW5QYW5lbC5jdXJyZW50UGFuZWwgPSBuZXcgTWFpblBhbmVsKHBhbmVsLCBjb250ZXh0LCBzZWxlY3RlZFRleHQpO1xuICAgIH1cblxuICAgIE1haW5QYW5lbC5jdXJyZW50UGFuZWwuX3BhbmVsLndlYnZpZXcucG9zdE1lc3NhZ2UoeyB0eXBlOiBcImhlbGxvXCIsIGRhdGE6IFwiSGVsbG8gV29ybGQhXCIgfSk7XG4gICAgTWFpblBhbmVsLmN1cnJlbnRQYW5lbC5fcGFuZWwud2Vidmlldy5wb3N0TWVzc2FnZSh7IHR5cGU6IFwic2VsZWN0aW9uXCIsIGRhdGE6IHNlbGVjdGVkVGV4dCB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhbnMgdXAgYW5kIGRpc3Bvc2VzIG9mIHdlYnZpZXcgcmVzb3VyY2VzIHdoZW4gdGhlIHdlYnZpZXcgcGFuZWwgaXMgY2xvc2VkLlxuICAgKi9cbiAgcHVibGljIGRpc3Bvc2UoKSB7XG4gICAgTWFpblBhbmVsLmN1cnJlbnRQYW5lbCA9IHVuZGVmaW5lZDtcblxuICAgIC8vIERpc3Bvc2Ugb2YgdGhlIGN1cnJlbnQgd2VidmlldyBwYW5lbFxuICAgIHRoaXMuX3BhbmVsLmRpc3Bvc2UoKTtcblxuICAgIC8vIERpc3Bvc2Ugb2YgYWxsIGRpc3Bvc2FibGVzIChpLmUuIGNvbW1hbmRzKSBmb3IgdGhlIGN1cnJlbnQgd2VidmlldyBwYW5lbFxuICAgIHdoaWxlICh0aGlzLl9kaXNwb3NhYmxlcy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGRpc3Bvc2FibGUgPSB0aGlzLl9kaXNwb3NhYmxlcy5wb3AoKTtcbiAgICAgIGlmIChkaXNwb3NhYmxlKSB7XG4gICAgICAgIGRpc3Bvc2FibGUuZGlzcG9zZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwgImltcG9ydCBfX2dldFdlYnZpZXdIdG1sX18gZnJvbSAnQHRvbWpzL3ZpdGUtcGx1Z2luLXZzY29kZS93ZWJ2aWV3JztcbmltcG9ydCB7IERpc3Bvc2FibGUsIEV4dGVuc2lvbkNvbnRleHQsIFdlYnZpZXcsIHdpbmRvdyB9IGZyb20gJ3ZzY29kZSc7XG5cbmV4cG9ydCBjbGFzcyBXZWJ2aWV3SGVscGVyIHtcbiAgcHVibGljIHN0YXRpYyBzZXR1cEh0bWwod2VidmlldzogV2VidmlldywgY29udGV4dDogRXh0ZW5zaW9uQ29udGV4dCkge1xuICAgIHJldHVybiBwcm9jZXNzLmVudi5WSVRFX0RFVl9TRVJWRVJfVVJMXG4gICAgICA/IF9fZ2V0V2Vidmlld0h0bWxfXyhwcm9jZXNzLmVudi5WSVRFX0RFVl9TRVJWRVJfVVJMKVxuICAgICAgOiBfX2dldFdlYnZpZXdIdG1sX18od2VidmlldywgY29udGV4dCk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIHNldHVwV2Vidmlld0hvb2tzKHdlYnZpZXc6IFdlYnZpZXcsIGRpc3Bvc2FibGVzOiBEaXNwb3NhYmxlW10pIHtcbiAgICB3ZWJ2aWV3Lm9uRGlkUmVjZWl2ZU1lc3NhZ2UoXG4gICAgICAobWVzc2FnZTogYW55KSA9PiB7XG4gICAgICAgIGNvbnN0IHR5cGUgPSBtZXNzYWdlLnR5cGU7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBtZXNzYWdlLmRhdGE7XG4gICAgICAgIGNvbnNvbGUubG9nKGB0eXBlOiAke3R5cGV9YCk7XG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgIGNhc2UgJ2hlbGxvJzpcbiAgICAgICAgICAgIHdpbmRvdy5zaG93SW5mb3JtYXRpb25NZXNzYWdlKGRhdGEpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdW5kZWZpbmVkLFxuICAgICAgZGlzcG9zYWJsZXMsXG4gICAgKTtcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQUFBQSxpQkFBMkM7OztBQ0EzQyxJQUFBQyxpQkFBK0U7OztBQ0EvRSxxQkFBK0I7QUFDL0Isb0JBQThEO0FBRXZELElBQU0sZ0JBQU4sTUFBb0I7QUFBQSxFQUN6QixPQUFjLFVBQVUsU0FBa0IsU0FBMkI7QUFDbkUsV0FBTywrQkFDSCxlQUFBQyxTQUFtQix3QkFBK0IsUUFDbEQsZUFBQUEsU0FBbUIsU0FBUyxPQUFPO0FBQUEsRUFDekM7QUFBQSxFQUVBLE9BQWMsa0JBQWtCLFNBQWtCLGFBQTJCO0FBQzNFLFlBQVE7QUFBQSxNQUNOLENBQUMsWUFBaUI7QUFDaEIsY0FBTSxPQUFPLFFBQVE7QUFDckIsY0FBTSxPQUFPLFFBQVE7QUFDckIsZ0JBQVEsSUFBSSxTQUFTLElBQUksRUFBRTtBQUMzQixnQkFBUSxNQUFNO0FBQUEsVUFDWixLQUFLO0FBQ0gsaUNBQU8sdUJBQXVCLElBQUk7QUFDbEM7QUFBQSxRQUNKO0FBQUEsTUFDRjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRjs7O0FEdkJPLElBQU0sYUFBTixNQUFNLFdBQVU7QUFBQSxFQU1iLFlBQVksT0FBcUIsU0FBMkIsYUFBcUI7QUFKekYsd0JBQWlCO0FBQ2pCLHdCQUFRLGdCQUE2QixDQUFDO0FBQ3RDLHdCQUFRO0FBR04sU0FBSyxTQUFTO0FBQ2QsU0FBSyxlQUFlO0FBQ3BCLFNBQUssT0FBTyxhQUFhLE1BQU0sS0FBSyxRQUFRLEdBQUcsTUFBTSxLQUFLLFlBQVk7QUFDdEUsU0FBSyxPQUFPLFFBQVEsT0FBTyxjQUFjLFVBQVUsS0FBSyxPQUFPLFNBQVMsT0FBTztBQUUvRSxrQkFBYyxrQkFBa0IsS0FBSyxPQUFPLFNBQVMsS0FBSyxZQUFZO0FBQUEsRUFDeEU7QUFBQSxFQUVBLE9BQWMsT0FBTyxTQUEyQjtBQWxCbEQ7QUFtQkksVUFBTSxTQUFTLHNCQUFPO0FBQ3RCLFVBQU0sWUFBWSxpQ0FBUTtBQUMxQixVQUFNLGlCQUFlLHNDQUFRLGFBQVIsbUJBQWtCLFFBQVEsZUFBYztBQUM3RCxZQUFRLElBQUksK0NBQThDLFlBQVk7QUFDdEUsUUFBSSxXQUFVLGNBQWM7QUFDMUIsaUJBQVUsYUFBYSxPQUFPLE9BQU8sMEJBQVcsR0FBRztBQUFBLElBQ3JELE9BQU87QUFDTCxZQUFNLFFBQVEsc0JBQU8sbUJBQW1CLGtCQUFrQixlQUFlLDBCQUFXLEtBQUs7QUFBQSxRQUN2RixlQUFlO0FBQUEsTUFDakIsQ0FBQztBQUVELGlCQUFVLGVBQWUsSUFBSSxXQUFVLE9BQU8sU0FBUyxZQUFZO0FBQUEsSUFDckU7QUFFQSxlQUFVLGFBQWEsT0FBTyxRQUFRLFlBQVksRUFBRSxNQUFNLFNBQVMsTUFBTSxlQUFlLENBQUM7QUFDekYsZUFBVSxhQUFhLE9BQU8sUUFBUSxZQUFZLEVBQUUsTUFBTSxhQUFhLE1BQU0sYUFBYSxDQUFDO0FBQUEsRUFDN0Y7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQUtPLFVBQVU7QUFDZixlQUFVLGVBQWU7QUFHekIsU0FBSyxPQUFPLFFBQVE7QUFHcEIsV0FBTyxLQUFLLGFBQWEsUUFBUTtBQUMvQixZQUFNLGFBQWEsS0FBSyxhQUFhLElBQUk7QUFDekMsVUFBSSxZQUFZO0FBQ2QsbUJBQVcsUUFBUTtBQUFBLE1BQ3JCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRjtBQWxERSxjQURXLFlBQ0c7QUFEVCxJQUFNLFlBQU47OztBREFBLFNBQVMsU0FBUyxTQUEyQjtBQUVsRCxVQUFRLGNBQWM7QUFBQSxJQUNwQix3QkFBUyxnQkFBZ0IsOEJBQThCLFlBQVk7QUFDakUsZ0JBQVUsT0FBTyxPQUFPO0FBQUEsSUFDMUIsQ0FBQztBQUFBLEVBQ0g7QUFDRjtBQUVPLFNBQVMsYUFBYTtBQUFDOyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfdnNjb2RlIiwgImltcG9ydF92c2NvZGUiLCAiX19nZXRXZWJ2aWV3SHRtbF9fIl0KfQo=