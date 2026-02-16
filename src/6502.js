
import { parser } from "./6502.grammar"
import { LRLanguage, LanguageSupport, indentNodeProp, foldNodeProp, foldInside, delimitedIndent } from "@codemirror/language"
import { styleTags, tags as t } from "@lezer/highlight"

export const Lezer6502 = LRLanguage.define({
    parser: parser.configure({
        props: [
            indentNodeProp.add({
                Application: delimitedIndent({ closing: ")", align: false })
            }),
            foldNodeProp.add({
                Application: foldInside
            }),
            styleTags({
                Identifier: t.variableName,
                DirectiveName: t.function(t.variableName),
                PseudoOp: t.function(t.variableName),
                Keyword: t.controlKeyword,
                Opcode: t.keyword,
                Label: t.labelName,
                String: t.string,
                Char: t.number,
                Number: t.number,
                Register: t.typeName,
                Comment: t.lineComment,
                Operator: t.operator,
                "( )": t.paren
            })
        ]
    }),
    languageData: {
        commentTokens: { line: ";" }
    }
})

export function lezer6502() {
    return new LanguageSupport(Lezer6502)
}
