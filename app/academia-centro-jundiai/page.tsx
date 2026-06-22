import { ServiceLanding } from "@/components/service-landing";
import { landingContent, serviceMetadata } from "@/lib/landing-content";

const content = landingContent["academia-centro-jundiai"];

export const metadata = serviceMetadata(content);

export default function AcademiaCentroJundiaiPage() {
  return <ServiceLanding content={content} />;
}
