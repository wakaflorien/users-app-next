import { FC } from "react";
import PageLayout from "../components/layout";
import Link from "next/link";
import { Icon } from "@iconify/react";
import CreateForm from "../components/Form";

 const Signup: FC = () => {
  return (
    <PageLayout home>
      <main className="flex items-center justify-center">
        <div className="w-1/3 p-10 border rounded-md my-12">
          <h2 className="font-bold py-8">Signup To continue</h2>
          <CreateForm />
          <span className="flex items-center gap-2">
            <Icon icon="ic:round-arrow-back" />
            <Link href="/" className="text-lg font-bold">
              Back To Login
            </Link>
          </span>
        </div>
      </main>
    </PageLayout>
  );
}
export default Signup