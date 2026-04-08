"use client";

import { loadStripe } from "@stripe/stripe-js";
import { CheckoutProvider } from "@stripe/react-stripe-js";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { CartItemsType, ShippingFormInputs } from "@repo/types";
import CheckoutForm from "./CheckoutForm";
import useCartStore from "@/stores/cartStore";

const stripe = loadStripe(
    "pk_test_51SGZuqCBYX0ksukD54Zf6m95CfRfhoCOKzWSr9pwoxIZXy0QszOEKkfRamE65WNP6g3opAazj4rJEcYRsiAE3zkK008ZQMIXaD"
);

const fetchClientSecret = async (cart: CartItemsType, token: string) => {
    return fetch(
        `${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/sessions/create-checkout-session`,
        {
            method: "POST",
            body: JSON.stringify({ cart }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    )
        .then((response) => response.json())
        .then((json) => {
            if (json.error) {
                throw new Error(json.error);
            }
            return json.checkoutSessionClientSecret;
        });
};

const StripePaymentForm = ({
    shippingForm,
}: {
    shippingForm: ShippingFormInputs;
}) => {
    const { cart, hasHydrated } = useCartStore();
    const [token, setToken] = useState<string | null>(null);
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { getToken } = useAuth();

    useEffect(() => {
        getToken().then((tk) => setToken(tk));
    }, [getToken]);

    useEffect(() => {
        if (token && hasHydrated && cart.length > 0) {
            fetchClientSecret(cart, token)
                .then((secret) => {
                    if (!secret) {
                        setErrorMessage("No client secret returned from the payment service.");
                    } else {
                        setClientSecret(secret);
                    }
                })
                .catch((e) => {
                    console.error(e);
                    setErrorMessage(e.message || "Failed to initialize payment.");
                });
        }
    }, [token, hasHydrated, cart]);

    if (!token || !hasHydrated) {
        return <div className="">Loading...</div>;
    }

    if (cart.length === 0) {
        return <div className="">Cart is empty!</div>;
    }

    if (errorMessage) {
        return <div className="">Backend Error: {errorMessage}</div>;
    }

    if (!clientSecret) {
        return <div className="">Loading payment method...</div>;
    }

    return (
        <CheckoutProvider
            stripe={stripe}
            options={{ fetchClientSecret: () => Promise.resolve(clientSecret) }}
        >
            <CheckoutForm shippingForm={shippingForm} />
        </CheckoutProvider>
    );
};

export default StripePaymentForm;