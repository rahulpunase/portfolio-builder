import Button from "@/lib/ui/components/button";
import { usePointerInteractions } from "@/lib/utils/hooks/usePointerInteraction";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import { useCallback, useEffect, useState } from "react";

type FloatingMenuState = {
  isBold: boolean;
  isCode: boolean;
  isItalic: boolean;
  isStrikethrough: boolean;
  isUnderline: boolean;
};

const FloatingToolbar = () => {
  const [state, setState] = useState<FloatingMenuState>({
    isBold: false,
    isCode: false,
    isItalic: false,
    isStrikethrough: false,
    isUnderline: false,
  });
  const [editor] = useLexicalComposerContext();
  const [coords, setCoords] = useState<{ x: number; y: number } | undefined>(
    undefined
  );

  const { isPointerDown, isPointerReleased } = usePointerInteractions();

  const calculatePosition = useCallback(() => {
    const domSelection = getSelection();
    const domRange =
      domSelection?.rangeCount !== 0 && domSelection?.getRangeAt(0);
    if (!domRange || isPointerDown) return setCoords(undefined);

    const node = domRange.commonAncestorContainer;
    const boundingRect = node.parentElement?.getBoundingClientRect();
    if (boundingRect) {
      setCoords({
        x: boundingRect.x + boundingRect.width / 2 || 0,
        y: boundingRect.y + 42 || 0,
      });
    }
  }, [isPointerDown]);

  const $handleSelectionChange = useCallback(() => {
    if (editor.isComposing()) return false;
    const selection = $getSelection();
    if ($isRangeSelection(selection) && !selection.anchor.is(selection.focus)) {
      calculatePosition();
    } else {
      setCoords(undefined);
    }

    return true;
  }, [editor, calculatePosition]);

  useEffect(() => {
    const unregisterListener = editor.registerUpdateListener(
      ({ editorState }) => {
        editorState.read(() => {
          const selection = $getSelection();
          if (!$isRangeSelection(selection)) return;
          setState({
            isBold: selection.hasFormat("bold"),
            isCode: selection.hasFormat("code"),
            isItalic: selection.hasFormat("italic"),
            isStrikethrough: selection.hasFormat("strikethrough"),
            isUnderline: selection.hasFormat("underline"),
          });
        });
      }
    );

    return unregisterListener;
  }, [editor]);

  useEffect(() => {
    const unregisterCommand = editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      $handleSelectionChange,
      COMMAND_PRIORITY_LOW
    );
    return unregisterCommand;
  }, [editor, $handleSelectionChange]);

  useEffect(() => {
    if (isPointerReleased) {
      editor.getEditorState().read(() => {
        $handleSelectionChange();
      });
    }
  }, [isPointerReleased, $handleSelectionChange, editor]);

  return (
    coords && (
      <div
        style={{
          top: `${coords?.y}px`,
          left: `${coords?.x}px`,
        }}
        className="flex fixed items-center shadow-lg bg-white border-[1px] border-border-1 rounded-md p-1 gap-1"
      >
        <Button
          aria-label="Format text as bold"
          variant={state.isBold ? "secondary" : "ghost"}
          className="rounded-[4px]"
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
          }}
        >
          B
        </Button>
        <Button
          aria-label="Format text as italics"
          variant={state.isItalic ? "secondary" : "ghost"}
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
          }}
        >
          I
        </Button>
        <Button
          aria-label="Format text to underlined"
          variant={state.isUnderline ? "secondary" : "ghost"}
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
          }}
        >
          U
        </Button>
        {/* <Button
        aria-label="Format text with a strikethrough"
        active={state.isStrikethrough}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
        }}
      ></Button>
      <Button
        aria-label="Format text with inline code"
        active={state.isCode}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code");
        }}
      /> */}
      </div>
    )
  );
};

export default FloatingToolbar;
