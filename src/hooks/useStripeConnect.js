import { useState, useEffect } from "react";
import { loadConnectAndInitialize } from "@stripe/connect-js/pure";

const useStripeConnect = (connectedAccountId) => {
  const [stripeConnectInstance, setStripeConnectInstance] = useState();

  useEffect(() => {
    if (connectedAccountId) {
      const fetchClientSecret = async () => {
        const response = await fetch("/api/account-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            accountId: connectedAccountId,
          }),
        });

        if (!response.ok) {
          // Handle errors on the client side here
          const { error } = await response.json();
          throw `An error occurred: ${error}`;
        } else {
          const { client_secret: clientSecret } = await response.json();
          return clientSecret;
        }
      };

      setStripeConnectInstance(
        loadConnectAndInitialize({
          publishableKey: process.env.NEXT_PUBLIC_STRIPE_PK,
          fetchClientSecret,
          appearance: {
            variables: {
              fontFamily: "Quicksand",
              colorPrimary: "#0035ef",
              colorText: "#27282D",
              colorDanger: "#2f5af6",
              buttonSecondaryColorBorder: "#0035ef",
              buttonSecondaryColorBackground: "#FFFFFF",
              colorSecondaryText: "#808080",
              formHighlightColorBorder: "#0035ef",
              formAccentColor: "#0035ef",
              borderRadius: "8px",
              buttonBorderRadius: "24px",
              badgeBorderRadius: "24px",
              spacingUnit: "14px",
              fontSizeBase: "18px",
              labelMdTextTransform: "uppercase",
              labelMdFontSize: "12px",
              labelMdFontWeight: "400",
            },
          },
          fonts: [
            {
              cssSrc:
                "https://fonts.googleapis.com/css2?family=Quicksand:wght@200;300;400;500;600;700;800&display=swap",
            },
          ],
        })
      );
    }
  }, [connectedAccountId]);

  return stripeConnectInstance;
};

export default useStripeConnect;
