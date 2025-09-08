
import React from "react";
import { ArrowRight, CreditCard } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface PaymentSectionProps {
  paymentInfo: any;
}

export const PaymentSection: React.FC<PaymentSectionProps> = ({ paymentInfo }) => {
  return (
    <div className="form-spacing-tight">
      <h2 className="text-lg font-semibold flex items-center gap-2">
        <CreditCard className="h-5 w-5 text-primary" />
        Payment Information
      </h2>
      <Separator />
      {paymentInfo ? (
        <div className="form-spacing-normal pt-2">
          {paymentInfo.payment_method === 'bank_transfer' && (
            <>
              <div className="flex items-start gap-2">
                <div>
                  <p className="text-sm text-gray-500">Bank Name</p>
                  <p>{paymentInfo.bank_name || "Not provided"}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div>
                  <p className="text-sm text-gray-500">Account Name</p>
                  <p>{paymentInfo.account_name || "Not provided"}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div>
                  <p className="text-sm text-gray-500">IBAN</p>
                  <p>{paymentInfo.iban ? "••••" + paymentInfo.iban.slice(-4) : "Not provided"}</p>
                </div>
              </div>
            </>
          )}
          
          {paymentInfo.payment_method === 'paypal' && (
            <div className="flex items-start gap-2">
              <div>
                <p className="text-sm text-gray-500">PayPal Email</p>
                <p>{paymentInfo.paypal_email || "Not provided"}</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="pt-3">
          <p className="text-gray-500 text-sm mb-3">No payment information has been added yet</p>
          <Button variant="outline" size="sm" asChild>
            <Link to="/provider/settings?tab=payment" className="flex items-center gap-1">
              Add payment information <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};
