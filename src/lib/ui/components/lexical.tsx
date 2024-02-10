import { useEffect } from "react";
import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import {
  BLUR_COMMAND,
  COMMAND_PRIORITY_LOW,
  EditorThemeClasses,
  FOCUS_COMMAND,
} from "lexical";
import { cn } from "../utils";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HeadingNode, QuoteNode, $createHeadingNode } from "@lexical/rich-text";
import { $getRoot, $createParagraphNode, $createTextNode } from "lexical";

// Lexical React plugins are React components, which makes them
// highly composable. Furthermore, you can lazy load plugins if
// desired, so you don't pay the cost for plugins until you
// actually use them.
function MyCustomAutoFocusPlugin({ onFocus, onBlur }) {
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
    // Focus the editor when the effect fires!
    onFocus?.();
    editor.focus();

    editor.update(() => {
      const root = $getRoot();
      const h1 = $createHeadingNode("h1");
      const text = $createTextNode("About me");
      h1.append(text);
      root.append(h1);
    });
  }, [editor]);

  return null;
}

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error) {
  console.error(error);
}

type LexicalEditorProps = {
  theme: EditorThemeClasses;
  placeholderText: string;
  onFocus?: () => void;
  onBlur?: () => void;
};

function LexicalEditor({
  theme,
  placeholderText,
  onFocus,
  onBlur,
  ...rest
}: LexicalEditorProps) {
  const initialConfig: InitialConfigType = {
    namespace: "MyEditor",
    theme: {
      ...theme,
    },
    onError,
    nodes: [HeadingNode],
  };

  return (
    <div className={cn("relative")}>
      <LexicalComposer initialConfig={initialConfig}>
        <RichTextPlugin
          contentEditable={<ContentEditable className="w-full outline-none" />}
          placeholder={
            <div
              className={cn(
                "absolute text-editorPlaceholder select-none pointer-events-none top-[50%] translate-y-[-50%] overflow-hidden",
                theme.paragraph
              )}
            >
              {placeholderText}
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <MyCustomAutoFocusPlugin onFocus={onFocus} onBlur={onBlur} />
      </LexicalComposer>
    </div>
  );
}

export default LexicalEditor;
