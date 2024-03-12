import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SK as string, {
  apiVersion: `2023-10-16`,
});

export const post = async (url: string, data: any) => {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export const get = async (url: string, data?: any) => {
  const response = await fetch(
    url + (data ? "?" + new URLSearchParams(data).toString() : " "),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.json();
};

export const JsonResponse = (data: any) => {
  return new Response(JSON.stringify(data, null, 2), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
