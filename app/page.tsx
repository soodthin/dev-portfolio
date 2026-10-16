import { VerticalStackDeck } from '@/components/deck/VerticalStackDeck';
import { portfolioData } from '@/data/portfolio-data';

export default function HomePage() {
  return <VerticalStackDeck data={portfolioData} />;
}
