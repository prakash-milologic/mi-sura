import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function UnauthorizedPage() {
  return (
    <div>
      <div>Unauthorized</div>
      <Button variant={"outline"} asChild>
        <Link href="/auth">Go back</Link>
      </Button>
    </div>
  );
}
