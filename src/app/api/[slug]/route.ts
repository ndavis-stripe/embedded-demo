import { stripe, JsonResponse } from "@/utils";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;

  if (slug == "deleteall") {
    const accounts = await stripe.accounts.list({ limit: 100 });
    for (let account of accounts.data) {
      stripe.accounts.del(account.id);
    }
    return JsonResponse({
      deleted: accounts.data.length,
    });
  }
}

export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;
  const requestBody = await request.json();
  let accountId;

  if (slug == "create-account") {
    try {
      if (requestBody.type == "COMPANY") {
        // See information you can prefill at https://docs.stripe.com/api/accounts/create.
        const account = await stripe.accounts.create({
          type: "custom",
          country: "US",
          business_type: "company",
          business_profile: {
            // See https://stripe.com/guides/merchant-category-codes.
            mcc: "8299",
            product_description:
              "Educational services for fitness and health instructors",
          },
          company: {
            // See https://docs.stripe.com/connect/testing#test-business-tax-ids for testing.
            tax_id: "222222222",
          },
          capabilities: {
            card_payments: { requested: true },
            transfers: { requested: true },
          },
        });
        accountId = account.id;
      } else if (requestBody.type == "INDIVIDUAL") {
        // See information you can prefill at https://docs.stripe.com/api/accounts/create.
        const account = await stripe.accounts.create({
          type: "custom",
          country: "US",
          business_type: "individual",
          business_profile: {
            // See https://stripe.com/guides/merchant-category-codes.
            mcc: "8299",
            product_description:
              "Educational services for fitness and health instructors",
          },
          individual: {
            first_name: "Nate",
            last_name: "Davis",
            // See https://docs.stripe.com/connect/testing#test-personal-id-numbers
            // for testing.
            id_number: "000000000",
            ssn_last_4: "0000",
            email: "ndavis@stripe.com",
          },
          company: {
            // The individual's id_number (SSN in this case).
            tax_id: "000000000",
          },
          capabilities: {
            card_payments: { requested: true },
            transfers: { requested: true },
          },
        });
        accountId = account.id;
      }

      return JsonResponse({
        accountId: accountId,
      });
    } catch (error: any) {
      console.error(
        "An error occurred when calling the Stripe API to create an account",
        error
      );
      throw new Error("An error occurred when calling the Stripe API");
    }
  } else if (slug == "account-session") {
    try {
      const accountSession = await stripe.accountSessions.create({
        account: requestBody.accountId,
        components: {
          account_onboarding: { enabled: true },
        },
      });

      return JsonResponse({
        client_secret: accountSession.client_secret,
      });
    } catch (error: any) {
      console.error(
        "An error occurred when calling the Stripe API to create an account session",
        error
      );
      throw new Error("An error occurred when calling the Stripe API");
    }
  }
}
