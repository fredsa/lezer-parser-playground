import { oneDark } from "@codemirror/theme-one-dark"
import { EditorView, basicSetup } from "codemirror"
import { debugHighlightTagsTooltip } from "./debug.js"
import { example6502, exampleZ80 } from "./examples.js"
import { asm6502, lezerZ80 } from "./index.js"

const editorTheme = EditorView.theme({
    "&": {
        // height: "100%",
    },
});

new EditorView({
    doc: example6502,
    extensions: [
        basicSetup,
        editorTheme,
        oneDark,
        asm6502(),
        debugHighlightTagsTooltip,
    ],
    parent: document.getElementById("editor-6502")
})

new EditorView({
    doc: exampleZ80,
    extensions: [
        basicSetup,
        editorTheme,
        oneDark,
        lezerZ80(),
        debugHighlightTagsTooltip,
    ],
    parent: document.getElementById("editor-z80")
})
