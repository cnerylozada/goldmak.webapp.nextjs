import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Link,
} from "@react-email/components";
import * as React from "react";

interface ReceiptEmailProps {
  owner: string;
  productDetail: {
    name: string;
    image: string;
  };
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const ReceiptEmail = ({ owner, productDetail }: ReceiptEmailProps) => (
  <Html>
    <Head />
    <Preview>It is time to enjoy your new product!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={productDetail.image}
          width="170"
          height="170"
          alt="Koala"
          style={logo}
        />
        <Text style={paragraph}>Hi, {owner}</Text>
        <Text style={paragraph}>Product: {productDetail.name}</Text>
        <Section style={btnContainer}>
          <Button style={button} href="https://goldmak.io/">
            Go to Goldmak
          </Button>
        </Section>
        <Text style={paragraph}>
          Best,
          <br />
          <Link
            style={anchor}
            href="https://www.linkedin.com/in/cristian-nery-027b70180/"
          >
            Author: Cristian Nery Sr web2 ft web3 developer
          </Link>
        </Text>
        <Hr style={hr} />
        <Text style={footer}>Goldmak challenge</Text>
      </Container>
    </Body>
  </Html>
);

ReceiptEmail.PreviewProps = {
  owner: "Lucciano",
  productDetail: {
    name: "my product mocked",
    image:
      "https://miro.medium.com/v2/resize:fit:728/1*MVc6Bwoj5LWsZ-5xBnnkEw.png",
  },
} as ReceiptEmailProps;

export default ReceiptEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const anchor = {
  color: "#556cd6",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#5F51E8",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
