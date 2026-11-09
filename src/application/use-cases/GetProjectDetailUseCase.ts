import type { IPortfolioRepository } from '@/domain/repositories/IPortfolioRepository';
import type { ProjectDTO } from '../dto/ProjectDTO';

export class GetProjectDetailUseCase {
  constructor(private readonly repository: IPortfolioRepository) {}

  async execute(slugOrId: string): Promise<ProjectDTO | null> {
    const project = await this.repository.getProjectBySlug(slugOrId);
    if (!project) return null;

    return {
      id: project.id,
      slug: project.slug,
      title: project.title,
      role: project.role,
      category: project.category,
      period: project.period,
      status: project.status,
      statusType: project.statusType,
      description: project.description,
      caseStudyContent: project.caseStudyContent,
      org: project.org,
      field: project.field,
      tasks: project.tasks,
      result: project.result,
      challenge: project.challenge,
      approach: project.approach,
      technologies: project.technologies,
      metrics: project.metrics ?? [],
      demoUrl: project.demoUrl,
      repositoryUrl: project.repositoryUrl,
      thumbnailUrl: project.thumbnailUrl,
      featured: project.featured,
    };
  }
}
