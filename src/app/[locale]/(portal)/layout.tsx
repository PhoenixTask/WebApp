import { Flex } from "@/components/UI";
import AuthHeader from "./components/AuthHeader";
import { direction } from "@/functions/direction";

type AuthLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function AuthLayout({
  children,
  params,
}: AuthLayoutProps) {
  const { locale } = await params;

  return (
    <Flex
      {...direction(locale)}
      direction="col"
      alignItems="between"
      className="m-0 p-0 h-screen w-full overflow-hidden relative"
    >
      <AuthHeader />
      <section className="flex justify-center items-center mt-32 z-50 -m-4">
        {children}
      </section>
      <div className="absolute top-96 w-screen h-screen -z-10 -skew-y-6 bg-gradient-to-l from-primary to-secondary" />
    </Flex>
  );
}
