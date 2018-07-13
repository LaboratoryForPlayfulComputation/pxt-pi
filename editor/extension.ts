/// <reference path="../node_modules/pxt-core/built/pxteditor.d.ts" />

namespace pxt.editor {
    const _PORT = 3074;
    const _HOST = "localhost";
    const _PATH = "/save";
    initExtensionsAsync = function (opts: pxt.editor.ExtensionOptions): Promise<pxt.editor.ExtensionResult> {
        pxt.debug('loading pxt-pi target extensions...');
        const res : pxt.editor.ExtensionResult = {
            saveProjectAsync: async (res: pxt.cpp.HexFile) => {
                const payload = res.source;
                console.log("sending: ", res);
                return pxt.Util.httpPostJsonAsync(`http://${_HOST}:${_PORT}${_PATH}`, res.source)
                    .then(() => {}); // Convert Promise<any> to Promise<void>
            }
        };
        return Promise.resolve<pxt.editor.ExtensionResult>(res);
    }
}