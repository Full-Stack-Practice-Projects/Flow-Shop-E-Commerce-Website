import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function EmailSubscribe() {
  return (
    <div className="col-span-2 md:col-span-1 lg:col-span-2 lg:pl-8">
      <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
        Subscribe to newsletter
      </p>

      <form action="#" method="POST" className="mt-6">
        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            className="block w-full"
          />
        </div>

        <Button
          type="submit"
          size="lg"
          className="mt-3 inline-flex items-center justify-center rounded-md bg-primary px-6 py-4"
        >
          Subscribe
        </Button>
      </form>
    </div>
  );
}
