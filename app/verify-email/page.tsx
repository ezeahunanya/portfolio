import { Metadata } from "next";
import WarningAlertComponent from "../_components/ui/warningAlertComponent";
import { verifyToken } from "./verifyEmail";
import Alert from "../_components/ui/alert";

export const metadata: Metadata = {
  title: "Verify Email",
};

interface VerifyEmailPageProps {
  searchParams: Promise<{ token?: string }>;
}

export default async function VerifyEmailPage({
  searchParams,
}: VerifyEmailPageProps) {
  const { token } = await searchParams;

  if (!token) {
    return <Alert type="error" message="Invalid request: Token is missing." />;
  }

  // Simulate API call to verify token
  const result = await verifyToken(token);

  if (result.error) {
    return (
      <WarningAlertComponent
        token={token}
        error={result.error}
        origin="verify-email"
      />
    );
  }

  return <Alert type="success" message={result.data.message} />;
}
