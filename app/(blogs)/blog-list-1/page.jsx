import FooterOne from "@/components/layout/footers/FooterOne";
import Header1 from "@/components/layout/header/Header1";
import Hero1 from "@/components/blogs/Hero1";
import BlogList1 from "@/components/blogs/BlogList1";
import Header3 from "@/components/layout/header/Header3";
import FooterTwo from "@/components/layout/footers/FooterTwo";

export const metadata = {
  title: "Blog-list-1 || ViaTour - Travel & Tour React NextJS Template",
  description: "ViaTour - Travel & Tour React NextJS Template",
};

export default function page() {
  return (
    <>
      <main>
        <Header3 />
        <Hero1 />
        <BlogList1 />
        <FooterTwo />
      </main>
    </>
  );
}
