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
              fontFamily: "Raleway, sans-serif",
              colorPrimary: "#E0433E",
              colorText: "#242424",
              colorDanger: "#E0433E",
              buttonSecondaryColorText: "#0C3C60",
              buttonSecondaryColorBorder: "#0C3C60",
              buttonSecondaryColorBackground: "#eee",
              colorSecondaryText: "#666666",
              formHighlightColorBorder: "#E0433E ",
              formAccentColor: "#E0433E",
              borderRadius: "4px",
              buttonBorderRadius: "4px",
              badgeBorderRadius: "24px",
              spacingUnit: "12px",
              fontSizeBase: "18px",
              labelMdTextTransform: "uppercase",
              labelMdFontSize: "15px",
              labelMdFontWeight: "400",
            },
          },
          fonts: [
            {
              cssSrc:
                "https://fonts.googleapis.com/css2?family=Raleway:wght@200;300;400;500;600;700;800&display=swap",
            },
          ],
        })
      );
    }
  }, [connectedAccountId, clientSecret]);

  return stripeConnectInstance;
};

export default useStripeConnect;
