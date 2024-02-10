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
import { $getRoot, EditorThemeClasses } from "lexical";
import { useEffect } from "react";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";

type CustomUpdateProps = {
  htmlValue?: string;
  onValueChange?: (html: string) => void;
};

type EditorProps = {
  name: string;
  theme: EditorThemeClasses;
  placeholderText?: string;
} & CustomUpdateProps;

const CustomUpdate = ({ onValueChange, htmlValue }: CustomUpdateProps) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const htmlString = $generateHtmlFromNodes(editor, null);
        onValueChange?.(htmlString);
      });
    });
  }, [editor, onValueChange]);

  useEffect(() => {
    editor.update(() => {
      if (htmlValue) {
        const parser = new DOMParser();
        const dom = parser.parseFromString(htmlValue, "text/html");
        const nodes = $generateNodesFromDOM(editor, dom);
        const root = $getRoot();
        nodes.forEach((node) => root.append(node));
        return;
      }
    });
  }, [editor]);

  return null;
};
const Editor = ({
  placeholderText,
  name,
  theme,
  onValueChange,
  htmlValue,
}: EditorProps) => {
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
        <CustomUpdate onValueChange={onValueChange} htmlValue={htmlValue} />
      </LexicalComposer>
    </div>
  );
};

export default Editor;
