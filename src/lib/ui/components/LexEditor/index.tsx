import useIsInPreviewMode from "@/lib/utils/hooks/useIsInPreviewMode";
import type { EditorThemeClasses } from "lexical";
import { Suspense, lazy } from "react";

const Editor = lazy(() => import("./Editor"));

type LexEditor = {
  name: string;
  theme: EditorThemeClasses;
  placeholderText?: string;
  htmlValue?: string;
  onValueChange?: (html: string) => void;
  isSectionInEditMode?: boolean;
};

const LexEditor = (props: LexEditor) => {
  const isInPreviewMode = useIsInPreviewMode();
  return (
    <Suspense>
      {isInPreviewMode ? (
        <div
          dangerouslySetInnerHTML={{
            __html: props.htmlValue || "",
          }}
        />
      ) : (
        <Editor {...props} />
      )}
    </Suspense>
  );
};

export default LexEditor;
