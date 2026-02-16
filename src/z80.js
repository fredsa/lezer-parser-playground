import { parser } from "./z80.grammar"
import { LRLanguage, LanguageSupport } from "@codemirror/language"

export const LezerZ80 = LRLanguage.define({
    parser: parser.configure({
        props: []
    }),
    languageData: {
        commentTokens: { line: ";" }
    }
})

export function lezerZ80() {
    return new LanguageSupport(LezerZ80)
}
