import ForgotPasswordForm from "../components/forgot-password-form";
import Image from "next/image";

export default async function ForgotPasswordPage() {
  return (
    <div>
      <Image
        className="m-8 absolute"
        src="/mi-suria-logo.png"
        width={180}
        height={180}
        alt="Mi-SURIA logo"
        priority
      />
      <div className="flex bg-cover justify-center items-center h-screen bg-[url('/login-background.jpg')] ">
        <div className="w-full px-5">
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
}
