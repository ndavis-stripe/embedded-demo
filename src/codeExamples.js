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

export const maxExample = `// See information you can prefill at https://docs.stripe.com/api/accounts/create.
const account = await stripe.accounts.create({
  type: "custom",
  business_type: "company",
  capabilities: {
    card_payments: { requested: true },
    transfers: { requested: true },
  },
  company: {
    // The individual's id_number (SSN in this case).
    tax_id: "000000000",
    address: {
      city: "San Francisco",
      country: "US",
      line1: "1234 Main Street",
      postal_code: "94111",
      state: "CA",
    },
    name: "Example company",
    phone: "888-867-5309",
  },
  country: "US",
  email: "test@example.com",
  metadata: {
    custom_key: "custom_value",
  },
  business_profile: {
    // See https://stripe.com/guides/merchant-category-codes.
    mcc: "8299",
    name: "Example company",
    product_description:
      "Educational services for fitness and health instructors",
    support_address: {
      city: "San Francisco",
      country: "US",
      line1: "1234 Main Street",
      postal_code: "94111",
      state: "CA",
    },
    support_email: "support@example.com",
    support_phone: "888-867-5309",
    support_url: "https://accessible.stripe.com",
    url: "https://accessible.stripe.com",
  },
  external_account: {
    object: "bank_account",
    country: "US",
    currency: "usd",
    account_holder_name: "Tester Person",
    account_holder_type: "individual",
    routing_number: "110000000",
    account_number: "000123456789",
  },
});

const person = await stripe.accounts.createPerson(account.id, {
  first_name: "Tester",
  last_name: "Person",
  email: "testperson@example.com",
  address: {
    city: "San Francisco",
    country: "US",
    line1: "1234 Main Street",
    postal_code: "94111",
    state: "CA",
  },
  dob: {
    day: 1,
    month: 1,
    year: 1901,
  },
  id_number: "000000000",
  ssn_last_4: "0000",
  metadata: {
    custom_key: "custom_value",
  },
  phone: "888-867-5309",
  political_exposure: "none",
  registered_address: {
    city: "San Francisco",
    country: "US",
    line1: "1234 Main Street",
    postal_code: "94111",
    state: "CA",
  },
  relationship: {
    director: true,
    executive: true,
    owner: true,
    representative: true,
    percent_ownership: 100,
    title: "CEO",
  },
});

const update = await stripe.accounts.update(account.id, {
  company: {
    owners_provided: true,
    directors_provided: true,
    executives_provided: true,
  },
});`;

export const minExample = `// See information you can prefill at https://docs.stripe.com/api/accounts/create.
const account = await stripe.accounts.create({
  // Minimum set of properties based on your use case and account configuration.
  type: "custom",
    country: "US",
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
});`;
