import { wixBrowserClient } from "@/lib/wix-browser.base";
import {
  BackInStockNotificationRequestValues,
  createBackInStockNotificationRequest,
} from "@/wix-api/backInStockNotification";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface BackInStockError {
  details?: {
    applicationError?: {
      code?: string;
    };
  };
}

export function useCreateBackInStockNotificationRequestMutation() {
  const createBackInStockNotificationRequestMutation = useMutation({
    mutationFn: (values: BackInStockNotificationRequestValues) =>
      createBackInStockNotificationRequest(wixBrowserClient, values),
    onError: (error) => {
      console.error(error);

      if (
        (error as BackInStockError)?.details?.applicationError?.code ===
        "BACK_IN_STOCK_NOTIFICATION_REQUEST_ALREADY_EXISTS"
      ) {
        toast.error("Request already exists", {
          description: "You are already subscribed to this product.",
        });
      } else {
        toast.error("Something went ", {
          description: "Something went wrong. Please try again.",
        });
      }
    },
  });
  return createBackInStockNotificationRequestMutation;
}
