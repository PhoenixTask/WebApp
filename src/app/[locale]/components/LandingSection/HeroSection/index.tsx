import { Flex, Heading } from "@/components/UI";
import Image from "next/image";

export default function HeroSection() {
  return (
    <Flex
      direction="col"
      justifyContent="center"
      alignItems="center"
      className="my-20 w-full"
    >
      <Flex
        direction="col"
        justifyContent="center"
        alignItems="center"
        className="animate-pulse flex flex-col justify-center items-center"
      >
        <Image src="/logo/Original.svg" alt="Origin" width={500} height={500} />
      </Flex>
      <Heading as="h1" size="XL" weight="900">
        PhoenixTask
      </Heading>
      <Heading as="h2" size="S" align="center" weight="800">
        یک تسک منیجر اوپن سورس با الهام از ترللو و کوئرا تسک منیجر :)
      </Heading>
    </Flex>
  );
}
