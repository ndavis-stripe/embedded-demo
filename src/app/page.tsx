"use client";

import { companyExample, individualExample } from "@/codeExamples";
import Example from "@/components/example";
import MenuTab from "@/components/menutab";
import { useState } from "react";
import styles from "./page.module.css";
import { useRouter, useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [tab, setTab] = useState(parseInt(searchParams.get("tab") || "1"));

  return (
    <main className={styles.main}>
      <div className={styles.menu}>
        <MenuTab
          selected={tab === 1}
          title="Company example"
          description="Prefill account information when a company tax ID is known."
          onClick={() => {
            setTab(1);
            router.push("/?tab=1");
          }}
        />
        <MenuTab
          selected={tab === 2}
          title="Individual example"
          description="Prefill account information when an individual identifier is known."
          onClick={() => {
            setTab(2);
            router.push("/?tab=2");
          }}
        />
      </div>
      <Example
        cookieName={"companyAccountId"}
        visible={tab === 1}
        exampleCode={companyExample}
      />
      <Example
        cookieName={"individualAccountId"}
        visible={tab === 2}
        exampleCode={individualExample}
      />
    </main>
  );
}
