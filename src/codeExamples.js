export const companyExample = `// See information you can prefill at https://docs.stripe.com/api/accounts/create.
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
    // See https://docs.stripe.com/connect/testing#test-business-tax-ids
    // for testing.
    tax_id: "222222222",
  },
  capabilities: {
    card_payments: { requested: true },
    transfers: { requested: true },
  },
});`;

export const individualExample = `// See information you can prefill at https://docs.stripe.com/api/accounts/create.
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
});`;
