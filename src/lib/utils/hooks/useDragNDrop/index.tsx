import { useEffect, useRef } from "react";

const useDragNDrop = (callBack: () => void) => {
  const handleRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const isMouseDown = useRef(false);

  const handler = () => {};

  useEffect(() => {
    draggingRef.current?.setAttribute("draggable", "true");

    draggingRef.current?.addEventListener("dragenter", function () {
      console.log("drag enter");
    });

    draggingRef.current?.addEventListener("dragstart", function (e) {
      console.log("drag start", e);
    });

    draggingRef.current?.addEventListener("dragend", function (e) {
      console.log("drag end");
    });
  }, []);

  return [handleRef, draggingRef, handler];
};

export default useDragNDrop;
