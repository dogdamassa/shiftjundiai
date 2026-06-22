import { ServiceLanding } from "@/components/service-landing";
import { landingContent, serviceMetadata } from "@/lib/landing-content";

const content = landingContent["personal-trainer-jundiai"];

export const metadata = serviceMetadata(content);

export default function PersonalTrainerJundiaiPage() {
  return <ServiceLanding content={content} />;
}
