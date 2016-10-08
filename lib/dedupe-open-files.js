'use babel';

import { CompositeDisposable } from 'atom';

const dbg = (methodName) => (...args) => atom.devMode && console[methodName](...args);
const _profile = dbg('profile');
const _profileEnd = dbg('profileEnd');
const _dir = dbg('dir');
const log = dbg('log');

log('reloaded meow');

export default {
    subscribers: [],
    focusExistingItemIfDuplicate({item, pane, uri}) {
        const newItemId = item.id;

        const isDuplicateEditor = editor => {
            if (editor.id !== newItemId) {
                const existingEditorUri = editor.getURI();

                return uri === existingEditorUri;
            }
        };

        const existingItem = [...atom.textEditors.editors].find(isDuplicateEditor);

        _profile('existingItem Branch');
        if (existingItem) {
            // Kill newly opened one
            pane.destroyItem(item);
            // For great glory
            const paneToActivate = atom.workspace.paneForURI(uri);
            // Yo dawg
            paneToActivate.activate();
            // Long live the active item
            paneToActivate.activateItemForURI(uri);
        }
        _profileEnd();
    },

    subscribeTo(disposable) {
        this.subscribers.push(disposable);
    },

    clearSubscriptions() {
        this.subscribers.forEach(disposable => disposable.dispose())
    },

    activate(state) {
        this.subscribeTo(
            atom.workspace.onDidOpen(this.focusExistingItemIfDuplicate)
        );
    },

    deactivate() {
        this.clearSubscriptions();
    },

    serialize() {
        return {}
    }
};
