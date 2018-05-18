/// <reference path="../node_modules/pxt-core/built/pxteditor.d.ts" />

namespace pxt.editor {
    initExtensionsAsync = function (opts: pxt.editor.ExtensionOptions): Promise<pxt.editor.ExtensionResult> {
        pxt.debug('loading pxt-pi target extensions...');
        const res : pxt.editor.ExtensionResult = {
            saveProjectAsync: (res: pxt.cpp.HexFile) => {
                const port = 3074;
                pxt.log(res);
                return pxt.Util.httpPostJsonAsync(`http://localhost:${port}/save`, res)
                    .then(() => {});
            }
        };
        return Promise.resolve<pxt.editor.ExtensionResult>(res);
    }
}