import { LRLanguage, LanguageSupport } from "@codemirror/language"
import { styleTags, tags as t } from "@lezer/highlight"
import { parser } from "./lang-z80.grammar"

export const LezerZ80: LRLanguage = LRLanguage.define({
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

export function lezerZ80(): LanguageSupport {
    return new LanguageSupport(LezerZ80)
}
