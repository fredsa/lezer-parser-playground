import { oneDark } from "@codemirror/theme-one-dark"
import { EditorView, basicSetup } from "codemirror"
import { debugHighlightTagsTooltip } from "./debug.js"
import { example6502, exampleZ80, exampleC } from "./examples.js"
import { asm6502, lezerZ80 } from "./index.js"
import { cpp } from "@codemirror/lang-cpp"

new EditorView({
    doc: example6502,
    extensions: [
        basicSetup,
        oneDark,
        asm6502(),
        debugHighlightTagsTooltip,
    ],
    parent: document.getElementById("editor-6502")
});

new EditorView({
    doc: exampleZ80,
    extensions: [
        basicSetup,
        oneDark,
        lezerZ80(),
        debugHighlightTagsTooltip,
    ],
    parent: document.getElementById("editor-z80")
});

new EditorView({
    doc: exampleC,
    extensions: [
        basicSetup,
        oneDark,
        cpp(),
        debugHighlightTagsTooltip,
    ],
    parent: document.getElementById("editor-c")
});

