const socialMediaLinks = [
  {
    id: 3,
    class: "icon-instagram",
    href: "https://www.instagram.com/golfcolor.tuk/",
  },
];

export default function Socials() {
  return (
    <>
      {socialMediaLinks.map((elm, i) => (
        <a key={i} href={elm.href} className={elm.class}></a>
      ))}
    </>
  );
}
