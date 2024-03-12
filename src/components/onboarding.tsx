import { FC } from "react";
import styles from "./onboarding.module.css";

import useStripeConnect from "../hooks/useStripeConnect";
import {
  ConnectAccountOnboarding,
  ConnectComponentsProvider,
} from "@stripe/react-connect-js";

const OnboardAccountComponent: FC<{
  connectedAccountId: string;
  advance: () => void;
}> = ({ connectedAccountId, advance }) => {
  const stripeConnectInstance = useStripeConnect(connectedAccountId);

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
