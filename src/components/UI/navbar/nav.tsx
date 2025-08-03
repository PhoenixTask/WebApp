import Link from "next/link";
import Button from "../Button";
import Heading from "../Heading";
import Links from "@/components/UI/Link";
const menuItems = [
  { name: "درباره ما", href: "/about" },
  { name: "تماس با ما", href: "/contact" },
];

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b">
      <div className="flex items-center gap-4">
        <Link href="/register">
          <Button variant="primary">ثبت‌نام</Button>
        </Link>

        <Link href="/login">
          <Button variant="secondary">ورود</Button>
        </Link>
      </div>

      <div className="flex items-center gap-6">
        {menuItems.map((item) => (
          <Links
            key={item.name}
            to={item.href}
            className="hover:text-primary"
            weight="700"
            textSize="S"
          >
            {item.name}
          </Links>
        ))}

        <Heading
          as="h1"
          size="XS"
          className="flex bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary select-none"
        >
          فونیکس تسک
        </Heading>
      </div>
    </nav>
  );
}
