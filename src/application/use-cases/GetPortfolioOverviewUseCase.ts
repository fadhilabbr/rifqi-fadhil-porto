import type { IPortfolioRepository } from '@/domain/repositories/IPortfolioRepository';
import { mapCompetencyToRadarDTO } from '../dto/CompetencyRadarDTO';
import type { PortfolioOverviewDTO } from '../dto/PortfolioOverviewDTO';

export class GetPortfolioOverviewUseCase {
  constructor(private readonly repository: IPortfolioRepository) {}

  async execute(): Promise<PortfolioOverviewDTO> {
    const [profile, projects, competencies, experiences] = await Promise.all([
      this.repository.getProfile(),
      this.repository.getProjects(),
      this.repository.getCompetencies(),
      this.repository.getExperiences(),
    ]);

    return {
      profile: {
        name: profile.name,
        callsign: profile.callsign,
        title: profile.title,
        studentId: profile.studentId,
        university: profile.university,
        faculty: profile.faculty,
        studyProgram: profile.studyProgram,
        email: profile.email,
        frequencyCode: profile.frequencyCode,
        locationOrigin: profile.locationOrigin,
        locationCurrent: profile.locationCurrent,
        bioSummary: profile.bioSummary,
        photoUrl: profile.photoUrl,
        cvUrl: profile.cvUrl,
        links: profile.links,
      },
      projects: projects.map((p) => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        role: p.role,
        category: p.category,
        period: p.period,
        status: p.status,
        statusType: p.statusType,
        description: p.description,
        caseStudyContent: p.caseStudyContent,
        org: p.org,
        field: p.field,
        tasks: p.tasks,
        result: p.result,
        challenge: p.challenge,
        approach: p.approach,
        technologies: p.technologies,
        metrics: p.metrics ?? [],
        demoUrl: p.demoUrl,
        repositoryUrl: p.repositoryUrl,
        thumbnailUrl: p.thumbnailUrl,
        featured: p.featured,
      })),
      competencies: competencies.map(mapCompetencyToRadarDTO),
      experiences: experiences.map((e) => ({
        id: e.id,
        type: e.type,
        title: e.title,
        organization: e.organization,
        location: e.location,
        period: e.period,
        isCurrent: e.isCurrent,
        description: e.description,
        highlights: e.highlights ?? [],
      })),
    };
  }
}
