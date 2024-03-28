import { FC } from "react";
import styles from "./onboarding.module.css";

import useStripeConnect from "../hooks/useStripeConnect";
import {
  ConnectAccountOnboarding,
  ConnectComponentsProvider,
} from "@stripe/react-connect-js";

const OnboardAccountComponent: FC<{
  connectedAccountId: string;
  clientSecret: string;
  advance: () => void;
}> = ({ connectedAccountId, clientSecret, advance }) => {
  const stripeConnectInstance = useStripeConnect(
    connectedAccountId,
    clientSecret
  );

  return (
    <div className={styles.onboardingWrapper}>
      {stripeConnectInstance && (
        <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
          <ConnectAccountOnboarding onExit={advance} />
        </ConnectComponentsProvider>
      )}
    </div>
  );
};

export default OnboardAccountComponent;
