import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

interface ForgotPasswordEmailProps {
  appUrl: string;
  generatedPassword: string;
}

export const ForgotPasswordEmailV2 = ({
  appUrl,
  generatedPassword,
}: ForgotPasswordEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your password has been reset</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px]"></Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Reset Password of your <strong>MI-Suria</strong> account
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              You recently visited our website {appUrl} and requested for forgot
              password.
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              We have generated a new temporary password for you. Please login
              using the new password and change it by visiting the Accounts page
              and Edit your credentials.
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Text className="text-black text-[14px] leading-[24px]">
                Temporary password: <strong>{generatedPassword}</strong>
              </Text>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]"></Text>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              If you were not expecting this reset password, you can ignore this
              email. If you are concerned about your account&apos;s safety,
              please reply to this email to get in touch with us.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ForgotPasswordEmailV2;
