/// <reference path="../node_modules/pxt-core/built/pxteditor.d.ts" />


namespace pxt.editor {
    const _PORT = window.location.port;
    const _HOST = window.location.hostname;
    const _PATH = "/api/save";
    initExtensionsAsync = function (_opts: pxt.editor.ExtensionOptions): Promise<pxt.editor.ExtensionResult> {
        pxt.debug('loading pxt-pi target extensions...');
        const res: pxt.editor.ExtensionResult = {
            customDownloadProjectAsync: async (res: pxt.cpp.HexFile) => {
                return pxt.Util.httpPostJsonAsync(`http://${_HOST}:${_PORT}${_PATH}`, res.source)
                    .then(() => { }); // Convert Promise<any> to Promise<void>
            }
        };
        return Promise.resolve<pxt.editor.ExtensionResult>(res);
    }
}
