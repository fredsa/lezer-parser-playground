import { parser } from "./z80.grammar"
import { styleTags, tags as t } from "@lezer/highlight"
import { LRLanguage, LanguageSupport } from "@codemirror/language"

export const LezerZ80 = LRLanguage.define({
    parser: parser.configure({
        props: [
            styleTags({
                Identifier: t.variableName,
                Directive: t.function(t.variableName),
                Opcode: t.keyword,
                Register: t.typeName,
                Condition: t.className,
                Number: t.number,
                Comment: t.lineComment,
                ", :": t.punctuation
            })
        ]
    }),
    languageData: {
        commentTokens: { line: ";" }
    }
})

export function lezerZ80() {
    return new LanguageSupport(LezerZ80)
}
