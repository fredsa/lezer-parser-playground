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
            // Zero size element, so tooltip quickly dismisses when mouse moves over it, force
            // CodeMirror's getBoundingClientRect() in isInTooltip() to always return false.
            dom.style.overflow = "visible";
            dom.style.height = "0";
            dom.style.width = "0";
            // Tooltip content.
            let inner = document.createElement("div");
            inner.className = "cm-debug-tooltip";
            inner.textContent = `Parser: ${parserType}\n${treeName}: ${tree.name}\nTags  : ${tagList}`;
            inner.style.whiteSpace = "pre-wrap";
            inner.style.fontFamily = "monospace";
            inner.style.background = "#333";
            inner.style.color = "white";
            inner.style.padding = "2px 8px";
            inner.style.borderRadius = "4px";
            inner.style.fontSize = "12px";
            inner.style.border = "1px solid #555";
            inner.style.pointerEvents = "none";
            inner.style.position = "absolute";
            inner.style.bottom = "0";
            inner.style.width = "max-content";
            dom.appendChild(inner);
            return { dom };
        }
    };
}, {
    hoverTime: 10,
    hideOnChange: true,
});