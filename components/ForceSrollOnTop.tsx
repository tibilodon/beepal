"use client";
//solution to nexts Link component's scrolling behaviour

import { useEffect } from "react";

export default function ForceScrollOnTop() {
  useEffect(() => window.document.scrollingElement?.scrollTo(0, 0), []);

  return null;
}
