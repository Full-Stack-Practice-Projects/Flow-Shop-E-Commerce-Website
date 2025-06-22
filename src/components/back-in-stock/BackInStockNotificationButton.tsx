import { env } from "@/env";
import { useCreateBackInStockNotificationRequestMutation } from "@/hooks/back-in-stock/useCreateBackInStockNotificationRequestMutation";
import { requiredString } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { products } from "@wix/stores";
import { useForm } from "react-hook-form";
import { z } from "zod";
import LoadingButton from "../buttons/LoadingButton";
import { Button, ButtonProps } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface BackInStockNotificationButton extends ButtonProps {
  product: products.Product;
  selectedOptions: Record<string, string>;
}

const backInStockNotificationFormSchema = z.object({
  email: requiredString.email(),
});

type BackInStockNotificationFormValues = z.infer<
  typeof backInStockNotificationFormSchema
>;

export default function BackInStockNotificationButton({
  product,
  selectedOptions,
  ...props
}: BackInStockNotificationButton) {
  const form = useForm<BackInStockNotificationFormValues>({
    resolver: zodResolver(backInStockNotificationFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const {
    isSuccess,
    isPending,
    mutate: createBackInStockNotificationRequestMutate,
  } = useCreateBackInStockNotificationRequestMutation();

  const onSubmit = async ({ email }: BackInStockNotificationFormValues) => {
    createBackInStockNotificationRequestMutate({
      email,
      itemUrl: `${env.NEXT_PUBLIC_BASE_URL}/products/${product.slug}`,
      product,
      selectedOptions,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button {...props}>Notify when available</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Notify when available</DialogTitle>
          <DialogDescription>
            Enter you email address and we will let you know when this product
            is back in stock
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton type="submit" isLoading={isPending}>
              Notify me
            </LoadingButton>
          </form>
        </Form>
        {isSuccess && (
          <div className="py-2.5 text-green-500">
            Thank you we will notify you when this product is back in stock.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
