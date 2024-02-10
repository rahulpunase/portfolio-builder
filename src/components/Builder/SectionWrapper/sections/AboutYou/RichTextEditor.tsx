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
import { HashtagPlugin } from "@lexical/react/LexicalHashtagPlugin";
import { HashtagNode } from "@lexical/hashtag";
import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  BLUR_COMMAND,
  COMMAND_PRIORITY_LOW,
  FOCUS_COMMAND,
} from "lexical";
import FloatingToolbar from "./FloatingToolbar";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { cn } from "@/lib/ui/utils";

// import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin";
// import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
// import AutoLinkPlugin from "./plugins/AutoLinkPlugin";

function Placeholder() {
  return (
    <div
      className={cn(
        "absolute text-editorPlaceholder select-none pointer-events-none top-[50%] translate-y-[-50%] overflow-hidden"
      )}
    >
      Enter something about you...
    </div>
  );
}

const editorConfig: InitialConfigType = {
  // The editor theme
  namespace: "About",
  theme: {
    heading: {
      h1: "text-[30px] font-semibold",
    },
    list: {
      ul: "list-disc ml-6",
    },
    hashtag: "text-hashtag",
  },
  // Handling of errors during update
  onError(error) {
    throw error;
  },
  // Any custom nodes go here
  nodes: [
    HashtagNode,
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
};
type RegisterCommandsProps = {
  onBlur?: () => void;
  onFocus?: () => void;
  onValueChange?: (html: string) => void;
  isSectionInEditMode: boolean;
};
function RegisterCommands({
  onBlur,
  onFocus,
  onValueChange,
  isSectionInEditMode,
}: RegisterCommandsProps) {
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

  useEffect(() => {
    editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const htmlString = $generateHtmlFromNodes(editor, null);
        onValueChange?.(htmlString);
      });
    });
  }, [editor, onValueChange]);

  useEffect(() => {
    editor.setEditable(isSectionInEditMode);
    if (isSectionInEditMode) {
      editor.focus();
    }
  }, [editor, isSectionInEditMode]);

  return null;
}

type DefaultNodesProps = {
  defaultContent?: string;
};

function DefaultNodes({ defaultContent }: DefaultNodesProps) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    editor.update(() => {
      if (defaultContent) {
        const parser = new DOMParser();
        const dom = parser.parseFromString(defaultContent, "text/html");
        const nodes = $generateNodesFromDOM(editor, dom);
        const root = $getRoot();
        nodes.forEach((node) => root.append(node));
        return;
      }
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

export type RichTextEditor = RegisterCommandsProps & DefaultNodesProps;

export default function RichTextEditor({
  onBlur,
  onFocus,
  onValueChange,
  isSectionInEditMode,
  defaultContent,
}: RichTextEditor) {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="relative">
        {/* <ToolbarPlugin /> */}
        <RichTextPlugin
          contentEditable={<ContentEditable className="outline-none" />}
          placeholder={<Placeholder />}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <AutoFocusPlugin />
        <ListPlugin />
        <LinkPlugin />
        <HashtagPlugin />
        {/* <AutoLinkPlugin /> */}
        {/* <ListMaxIndentLevelPlugin maxDepth={7} /> */}
        <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        <DefaultNodes defaultContent={defaultContent} />
        <RegisterCommands
          onBlur={onBlur}
          onFocus={onFocus}
          onValueChange={onValueChange}
          isSectionInEditMode={isSectionInEditMode}
        />
        {isSectionInEditMode && <FloatingToolbar />}
      </div>
    </LexicalComposer>
  );
}
