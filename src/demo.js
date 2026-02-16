import { EditorView, basicSetup } from "codemirror"
import { oneDark } from "@codemirror/theme-one-dark"
import { lezer6502, lezerZ80 } from "./index.js"
import { example6502, exampleZ80 } from "./examples.js"

new EditorView({
    doc: example6502,
    extensions: [
        basicSetup,
        oneDark,
        lezer6502()
    ],
    parent: document.getElementById("editor-6502")
})

new EditorView({
    doc: exampleZ80,
    extensions: [
        basicSetup,
        oneDark,
        lezerZ80()
    ],
    parent: document.getElementById("editor-z80")
})
