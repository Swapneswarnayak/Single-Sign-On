import Link from "next/link";
import { styled } from "@mui/material";
import Image from "next/image";

// import logo from ""

const LinkStyled = styled(Link)(() => ({
  // height: "70px",
  // width: "180px",
  overflow: "hidden",
}));

const Logo = () => {
  return (
    <LinkStyled href="/">
      <Image
        src="/GovLogo__2_.png"
        alt="logo"
        height={60}
        width={54}
        priority
      />
    </LinkStyled>
  );
};

export default Logo;
