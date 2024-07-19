import { AddresFormValues } from "@/components/steps/Address";
import { IdentificationFormValues } from "@/components/steps/Identification";
import { PaymentFormValues } from "@/components/steps/Payment";

export interface CheckoutValues
  extends IdentificationFormValues,
    AddresFormValues,
    PaymentFormValues {}
