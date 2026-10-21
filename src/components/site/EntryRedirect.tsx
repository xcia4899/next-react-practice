"use client";

import { useEffect } from "react";

export function EntryRedirect() {
  useEffect(() => {
    window.location.replace(`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/zh-TW/`);
  }, []);
  return null;
}
