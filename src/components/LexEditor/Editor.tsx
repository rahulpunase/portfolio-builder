import { cn } from "@/lib/ui/utils";
import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import {
  BLUR_COMMAND,
  COMMAND_PRIORITY_EDITOR,
  EditorThemeClasses,
} from "lexical";
import { useEffect } from "react";
import { $generateHtmlFromNodes } from "@lexical/html";

type EditorProps = {
  name: string;
  theme: EditorThemeClasses;
  placeholderText?: string;
  onUpdate?: (html: string) => void;
};

const CustomUpdate = ({ onUpdate }) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.update(() => {
      console.log(editor.toJSON());
    });

    editor.registerCommand(
      BLUR_COMMAND,
      () => {
        const htmlString = $generateHtmlFromNodes(editor, null);
        onUpdate?.(htmlString);
      },
      COMMAND_PRIORITY_EDITOR
    );
  }, [editor]);

  return null;
};
const Editor = ({ placeholderText, name, theme, onUpdate }: EditorProps) => {
  const initialConfig: InitialConfigType = {
    namespace: name,
    onError: (error) => console.log(error),
    theme,
  };

  return (
    <div className={cn("relative")}>
      <LexicalComposer initialConfig={initialConfig}>
        <PlainTextPlugin
          contentEditable={<ContentEditable className="w-full outline-none" />}
          placeholder={
            placeholderText ? (
              <div
                className={cn(
                  "absolute text-editorPlaceholder select-none pointer-events-none top-[50%] translate-y-[-50%] overflow-hidden",
                  theme?.paragraph
                )}
              >
                {placeholderText}
              </div>
            ) : null
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <CustomUpdate onUpdate={onUpdate} />
        {/* <MyCustomAutoFocusPlugin onFocus={onFocus} onBlur={onBlur} /> */}
      </LexicalComposer>
    </div>
  );
};

export default Editor;
