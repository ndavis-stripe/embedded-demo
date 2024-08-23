import { post } from "@/utils";
import { FC, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  github,
  grayscale,
  monoBlue,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import styles from "./example.module.css";
import Loader from "./loader";
import OnboardAccountComponent from "./onboarding";

const Example: FC<{
  cookieName: string;
  visible: boolean;
  exampleCode: string;
}> = ({ cookieName, visible, exampleCode }) => {
  const [cookies, setCookie, removeCookie] = useCookies([cookieName]);
  const [accountId, setAccountId] = useState<string | null>();
  const [embeddedComponentsClientSecret, setEmbeddedComponentsClientSecret] =
    useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchEmbeddedComponentClientSecret = async (accountId: string) => {
    setLoading(true);
    let response = await post("/api/account-session", {
      accountId: accountId || accountId,
    });
    setEmbeddedComponentsClientSecret(response.client_secret);
    setLoading(false);
  };

  useEffect(() => {
    let accountIdFromCookie = cookies[cookieName];
    setAccountId(accountIdFromCookie);
    if (accountIdFromCookie && !embeddedComponentsClientSecret && !loading) {
      fetchEmbeddedComponentClientSecret(accountIdFromCookie);
    }
  }, [cookies, cookieName, embeddedComponentsClientSecret, loading]);

  return (
    <div
      className={styles.container}
      style={{ display: visible ? "" : "none" }}
    >
      <div className={styles.cookieInfo}>
        Account ID: {accountId || "(none)"}
        <div
          className={styles.clearCookie}
          onClick={() => {
            removeCookie(cookieName);
            setAccountId(null);
            setEmbeddedComponentsClientSecret(null);
          }}
        >
          clear
        </div>
      </div>

      <SyntaxHighlighter
        wrapLines={true}
        showLineNumbers={true}
        language="javascript"
        style={grayscale}
        customStyle={{
          lineHeight: "28px",
          fontSize: "13px",
          borderRadius: "8px",
          padding: "24px",
          backgroundColor: "#f7f7f7",
          overflowX: "visible",
          width: "700px",
          maxWidth: "700px",
        }}
      >
        {exampleCode}
      </SyntaxHighlighter>
      <div>
        <div className={styles.row}>
          <div className={styles.col}>
            <button
              disabled={loading || !!embeddedComponentsClientSecret}
              onClick={async () => {
                setLoading(true);
                let response;
                if (!accountId) {
                  response = await post("/api/create-account", {
                    type: cookieName,
                  });
                  setAccountId(response.accountId);
                  setCookie(cookieName, response.accountId);
                }
                fetchEmbeddedComponentClientSecret(
                  accountId || response.accountId
                );
                setLoading(false);
              }}
            >
              Create and onboard account
            </button>
          </div>
          <div className={styles.col}>
            <Loader size={42} extraStyle={{ opacity: loading ? 1 : 0 }} />
          </div>
        </div>
      </div>
      {embeddedComponentsClientSecret && accountId && (
        <OnboardAccountComponent
          connectedAccountId={accountId}
          clientSecret={embeddedComponentsClientSecret}
          advance={() => {}}
        />
      )}
    </div>
  );
};

export default Example;
