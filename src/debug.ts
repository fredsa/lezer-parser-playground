import { syntaxTree, LRLanguage, StreamLanguage, language } from "@codemirror/language";
import { hoverTooltip } from "@codemirror/view";
import { getStyleTags, tags } from "@lezer/highlight";

// Create a reverse map for tags.
const tagNames = new Map<any, string>();
for (const [name, tag] of Object.entries(tags)) {
    tagNames.set(tag, name);
}

// Tooltip to show tags, useful for theme and parser development.
export const debugHighlightTagsTooltip = hoverTooltip((view, pos, side) => {
    let tree = syntaxTree(view.state).resolveInner(pos, side);
    let style = getStyleTags(tree);
    let tagList = "";
    if (style) {
        for (let tag of style.tags) {
            // Check tag and its parents.
            for (let t of tag.set) {
                if (tagNames.has(t)) {
                    if (tagList) tagList += ", ";
                    tagList += tagNames.get(t);
                    break;
                }
            }
        }
    }

    let lang = view.state.facet(language);
    let parserType = (lang instanceof LRLanguage) ? "Lezer LRLanguage" :
        (lang instanceof StreamLanguage) ? "StreamLanguage" : "Unknown";
    let treeName = (lang instanceof LRLanguage) ? "AST   " :
        (lang instanceof StreamLanguage) ? "Token " : "Name  ";

    return {
        pos: pos,
        above: true,
        arrow: true,
        create(view) {
            let dom = document.createElement("div");
            dom.className = "cm-debug-tooltip";
            dom.textContent = `Parser: ${parserType}\n${treeName}: ${tree.name}\nTags  : ${tagList}`;
            dom.style.whiteSpace = "pre-wrap";
            dom.style.fontFamily = "monospace";
            dom.style.background = "#333";
            dom.style.color = "white";
            dom.style.padding = "2px 8px";
            dom.style.borderRadius = "4px";
            dom.style.fontSize = "12px";
            dom.style.border = "1px solid #555";
            return { dom };
        }
    };
}, {
    hoverTime: 10,
    hideOnChange: true,
});