import { ServiceLanding } from "@/components/service-landing";
import { landingContent, serviceMetadata } from "@/lib/landing-content";

const content = landingContent["musculacao-jundiai"];

export const metadata = serviceMetadata(content);

export default function MusculacaoJundiaiPage() {
  return <ServiceLanding content={content} />;
}
