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
  onStepChange: (stepChange: any) => void;
}> = ({ connectedAccountId, clientSecret, advance, onStepChange }) => {
  const stripeConnectInstance = useStripeConnect(
    connectedAccountId,
    clientSecret
  );

  return (
    <div className={styles.onboardingWrapper}>
      {stripeConnectInstance && (
        <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
          <ConnectAccountOnboarding
            onExit={advance}
            onStepChange={onStepChange}
          />
        </ConnectComponentsProvider>
      )}
    </div>
  );
};

export default OnboardAccountComponent;
