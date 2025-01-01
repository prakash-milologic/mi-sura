import Image from "next/image";
import dynamic from "next/dynamic";
const UpdatePasswordForm = dynamic(
  () => import("../components/update-password-form"),
  {
    ssr: false,
  }
);
// import UpdatePasswordForm from "../components/update-password-form";

export default function UpdatePasswordPage() {
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
          <UpdatePasswordForm />
        </div>
      </div>
    </div>
  );
}
