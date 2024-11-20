// app/providers.tsx
"use client";

import ClientQuery from "@/components/ClientQuery";
import { NextUIProvider } from "@nextui-org/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ClientQuery> <NextUIProvider>{children}</NextUIProvider></ClientQuery>
}
