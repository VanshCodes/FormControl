import React from "react";
import LoadingOverlay from "react-loading-overlay-ts";

export default function Loading({ active }: { active: boolean }) {
  return (
    <div className="grid w-screen h-screen">
      <LoadingOverlay
        active={active}
        spinner
        text="Loading your content..."
      ></LoadingOverlay>
    </div>
  );
}
