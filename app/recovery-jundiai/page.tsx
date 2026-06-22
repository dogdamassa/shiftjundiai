import { ServiceLanding } from "@/components/service-landing";
import { landingContent, serviceMetadata } from "@/lib/landing-content";

const content = landingContent["recovery-jundiai"];

export const metadata = serviceMetadata(content);

export default function RecoveryJundiaiPage() {
  return <ServiceLanding content={content} />;
}
