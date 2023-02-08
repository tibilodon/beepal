"use client";

import { useEffect } from "react";

export default function ForceScrollOnTop() {
  useEffect(() => window.document.scrollingElement?.scrollTo(0, 0), []);

  return null;
}
