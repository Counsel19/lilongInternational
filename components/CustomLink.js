import Link from "next/link";

const CustomLink = ({ url, element }) => {
  return (
    <Link href={url}>
      <a>{element}</a>
    </Link>
  );
};

export default CustomLink;
