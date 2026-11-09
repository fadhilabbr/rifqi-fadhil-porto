import type { IPortfolioRepository } from '@/domain/repositories/IPortfolioRepository';
import { StaticPortfolioRepository } from '../repositories/StaticPortfolioRepository';
import { GetPortfolioOverviewUseCase } from '@/application/use-cases/GetPortfolioOverviewUseCase';
import { GetProjectDetailUseCase } from '@/application/use-cases/GetProjectDetailUseCase';

class AppContainer {
  private static portfolioRepo: IPortfolioRepository | null = null;

  public static getPortfolioRepository(): IPortfolioRepository {
    if (!this.portfolioRepo) {
      this.portfolioRepo = new StaticPortfolioRepository();
    }
    return this.portfolioRepo;
  }

  public static getPortfolioUseCases() {
    const repo = this.getPortfolioRepository();

    return {
      getPortfolioOverview: new GetPortfolioOverviewUseCase(repo),
      getProjectDetail: new GetProjectDetailUseCase(repo),
    };
  }
}

export const container = AppContainer;
export const getPortfolioUseCases = () => AppContainer.getPortfolioUseCases();
