import { useState, useEffect } from "react";
import { loadConnectAndInitialize } from "@stripe/connect-js/pure";

const useStripeConnect = (connectedAccountId, clientSecret) => {
  const [stripeConnectInstance, setStripeConnectInstance] = useState();

  useEffect(() => {
    if ((connectedAccountId, clientSecret)) {
      const fetchClientSecret = () => {
        return clientSecret;
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
  }, [connectedAccountId, clientSecret]);

  return stripeConnectInstance;
};

export default useStripeConnect;
