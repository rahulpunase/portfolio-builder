import { cn } from "@/lib/ui/utils";
import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { EditorThemeClasses } from "lexical";

type TitleEditorProps = {
  name: string;
  theme: EditorThemeClasses;
  placeholderText?: string;
};
const TitleEditor = ({ placeholderText, name, theme }: TitleEditorProps) => {
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
        {/* <MyCustomAutoFocusPlugin onFocus={onFocus} onBlur={onBlur} /> */}
      </LexicalComposer>
    </div>
  );
};

export default TitleEditor;
