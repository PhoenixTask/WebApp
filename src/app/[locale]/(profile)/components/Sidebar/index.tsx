import { Button, Heading, Flex, Icon } from "@/components/UI";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export default function ProfileSidebar() {
  const locale = useLocale();
  const router = useRouter();

  return (
    <Flex
      direction="col"
      justifyContent="between"
      alignItems="center"
      className="h-screen py-10 shadow-lg border-l border-neutral"
    >
      <div className="flex flex-col justify-center gap-2 w-72">
        <Heading
          as="h1"
          size="XS"
          className="flex justify-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary select-none"
        >
          فونیکس تسک
        </Heading>

        <Button onClick={() => router.push(`/${locale}/list`)}>
          <Icon iconName="Arrow" className="rotate-180" />
          <span>بازگشت</span>
        </Button>
      </div>
    </Flex>
  );
}
