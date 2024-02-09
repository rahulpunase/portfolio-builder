import useIsInPreviewMode from "@/lib/utils/hooks/useIsInPreviewMode";
import type { EditorThemeClasses } from "lexical";
import { Suspense, lazy } from "react";

const Editor = lazy(() => import("./Editor"));

type LexEditor = {
  name: string;
  theme: EditorThemeClasses;
  placeholderText?: string;
  htmlValue: string;
  onUpdate?: (html: string) => void;
};

const LexEditor = (props: LexEditor) => {
  const isInPreviewMode = useIsInPreviewMode();
  return (
    <Suspense>
      {isInPreviewMode ? (
        <div
          dangerouslySetInnerHTML={{
            __html: props.htmlValue,
          }}
        ></div>
      ) : (
        <Editor {...props} />
      )}
    </Suspense>
  );
};

export default LexEditor;
