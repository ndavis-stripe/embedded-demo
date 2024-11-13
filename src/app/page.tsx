"use client";

import {
  companyExample,
  individualExample,
  maxExample,
  minExample,
  stepChangeExample,
} from "@/codeExamples";
import Example from "@/components/example";
import MenuTab from "@/components/menutab";
import { Suspense, useState } from "react";
import styles from "./page.module.css";
import { useRouter, useSearchParams } from "next/navigation";

export default function Home() {
  const router = useRouter();

  function Page() {
    const searchParams = useSearchParams();
    const [tab, setTab] = useState(parseInt(searchParams.get("tab") || "1"));

    return (
      <main className={styles.main}>
        <div className={styles.menu}>
          <MenuTab
            selected={tab === 1}
            title="Empty state example"
            description="If no information is pre-filled, the full set of requirements will be collected during onboarding."
            onClick={() => {
              setTab(1);
              router.push("/?tab=1");
            }}
          />
          <MenuTab
            selected={tab === 2}
            title="Company example"
            description="Pre-fill account information when a company tax ID is known."
            onClick={() => {
              setTab(2);
              router.push("/?tab=2");
            }}
          />
          <MenuTab
            selected={tab === 3}
            title="Individual example"
            description="Pre-fill account information when an individual identifier is known."
            onClick={() => {
              setTab(3);
              router.push("/?tab=3");
            }}
          />
          <MenuTab
            selected={tab === 4}
            title="Maximum prefill example"
            description="Pre-fill all necessary information for an account. The user will only need to review and submit to acknowledge TOS."
            onClick={() => {
              setTab(4);
              router.push("/?tab=4");
            }}
          />
          <MenuTab
            selected={tab === 5}
            title="onStepChange example"
            description="Get called back when the connected account has navigated from one step to another within the onboarding process."
            onClick={() => {
              setTab(5);
              router.push("/?tab=5");
            }}
          />
        </div>

        <Example
          cookieName={"minAccountId"}
          visible={tab === 1}
          exampleCode={minExample}
        />
        <Example
          cookieName={"companyAccountId"}
          visible={tab === 2}
          exampleCode={companyExample}
        />
        <Example
          cookieName={"individualAccountId"}
          visible={tab === 3}
          exampleCode={individualExample}
        />
        <Example
          cookieName={"maxAccountId"}
          visible={tab === 4}
          exampleCode={maxExample}
        />
        <Example
          cookieName={"minAccountId"}
          visible={tab === 5}
          exampleCode={stepChangeExample}
        />
      </main>
    );
  }

  return (
    <Suspense>
      <Page />
    </Suspense>
  );
}
