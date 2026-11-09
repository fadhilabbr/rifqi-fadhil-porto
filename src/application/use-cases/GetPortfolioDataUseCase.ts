import type { IPortfolioRepository } from '@/domain/repositories/IPortfolioRepository';
import { GetPortfolioOverviewUseCase } from './GetPortfolioOverviewUseCase';
import type { PortfolioOverviewDTO } from '../dto/PortfolioOverviewDTO';

export class GetPortfolioDataUseCase {
  private readonly overviewUseCase: GetPortfolioOverviewUseCase;

  constructor(repository: IPortfolioRepository) {
    this.overviewUseCase = new GetPortfolioOverviewUseCase(repository);
  }

  async execute(): Promise<PortfolioOverviewDTO> {
    return this.overviewUseCase.execute();
  }
}
