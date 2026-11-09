import { getPortfolioUseCases } from '@/infrastructure/di/container';
import { FlightDeckView } from '@/presentation/components/flight-deck/FlightDeckView';

export default async function HomePage() {
  const { getPortfolioOverview } = getPortfolioUseCases();
  const portfolioOverview = await getPortfolioOverview.execute();

  return <FlightDeckView initialData={portfolioOverview} />;
}
