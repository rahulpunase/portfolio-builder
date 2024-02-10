import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
// import TreeViewPlugin from "./plugins/TreeViewPlugin";
// import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { $createHeadingNode, HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";

import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  BLUR_COMMAND,
  COMMAND_PRIORITY_LOW,
  FOCUS_COMMAND,
  LexicalEditor,
} from "lexical";
import FloatingToolbar from "./FloatingToolbar";

// import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin";
// import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
// import AutoLinkPlugin from "./plugins/AutoLinkPlugin";

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

const editorConfig: (
  setRef: (_editor: LexicalEditor) => void
) => InitialConfigType = (setRef) => ({
  // The editor theme
  namespace: "About",
  theme: {
    heading: {
      h1: "text-[30px]",
    },
  },
  // Handling of errors during update
  onError(error) {
    throw error;
  },
  editorState(editor) {
    setRef(editor);
  },
  // Any custom nodes go here
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
  ],
});
type RegisterCommandsProps = {
  onBlur?: () => void;
  onFocus?: () => void;
};
function RegisterCommands({ onBlur, onFocus }: RegisterCommandsProps) {
  const [editor] = useLexicalComposerContext();

  editor.registerCommand(
    BLUR_COMMAND,
    () => {
      onBlur?.();
      return false;
    },
    COMMAND_PRIORITY_LOW
  );

  editor.registerCommand(
    FOCUS_COMMAND,
    () => {
      onFocus?.();
      return true;
    },
    COMMAND_PRIORITY_LOW
  );
  return null;
}

function DefaultNodes() {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    editor.update(() => {
      const root = $getRoot();
      root.clear();
      const h1 = $createHeadingNode("h1");
      const text = $createTextNode("About me");
      h1.append(text);
      root.append(h1);
      const space = $createParagraphNode();
      root.append(space);
      const start = $createTextNode("Start writing here...");
      const p = $createParagraphNode();
      p.append(start);
      root.append(p);
    });
    editor.focus();
  }, [editor]);
  return null;
}

export type AboutEditorProps = {
  setEditorRef: (_editor: LexicalEditor) => void;
} & RegisterCommandsProps;

export default function AboutYouEditor({
  onBlur,
  onFocus,
  setEditorRef,
}: AboutEditorProps) {
  return (
    <LexicalComposer initialConfig={editorConfig(setEditorRef)}>
      <div className="relative">
        {/* <ToolbarPlugin /> */}
        <RichTextPlugin
          contentEditable={<ContentEditable className="p-4 outline-none" />}
          placeholder={<Placeholder />}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        {/* <TreeViewPlugin /> */}
        <AutoFocusPlugin />
        {/* <CodeHighlightPlugin /> */}
        <ListPlugin />
        <LinkPlugin />
        {/* <AutoLinkPlugin /> */}
        {/* <ListMaxIndentLevelPlugin maxDepth={7} /> */}
        <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        <DefaultNodes />
        <RegisterCommands onBlur={onBlur} onFocus={onFocus} />
        <FloatingToolbar />
      </div>
    </LexicalComposer>
  );
}
