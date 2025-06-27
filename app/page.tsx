import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/button/login-button";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default async function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center bg-background h-full">
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            "text-6xl font-semibold text-foreground drop-shadow-md",
            font.className,
          )}
        >
          🔒Auth
        </h1>
        <p className="text-lg text-foreground">A simple authentication service</p>
        <div>
          <LoginButton asChild>
            <Button variant="secondary" size="lg" className="font-bold">
              Sign In
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
