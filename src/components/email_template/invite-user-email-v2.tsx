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

interface InviteUserEmailProps {
  appUrl: string;
  generatedPassword: string;
}

export const InviteUserEmailV2 = ({
  appUrl,
  generatedPassword,
}: InviteUserEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>You have been invited to {appUrl}.</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px]">
              {/* <Img
                  src={`/public/mi-suria-logo.png`}
                  width="40"
                  height="37"
                  alt="MI-Suria"
                  className="my-0 mx-auto"
                /> */}
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Join <strong>MI-Suria</strong> Now
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hello,
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              We have created a MI-Suria account and generated a temporary
              password for you. Please login using the password and change it by
              visiting the Accounts page and Edit your credentials.
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Text className="text-black text-[14px] leading-[24px]">
                Temporary password: <strong>{generatedPassword}</strong>
              </Text>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              {/* or copy and paste this URL into your browser:{" "}
                <Link href={inviteLink} className="text-blue-600 no-underline">
                  {inviteLink}
                </Link> */}
            </Text>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              If you were not expecting this invitation, you can ignore this
              email. If you are concerned about your account&apos;s safety,
              please reply to this email to get in touch with us.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default InviteUserEmailV2;
