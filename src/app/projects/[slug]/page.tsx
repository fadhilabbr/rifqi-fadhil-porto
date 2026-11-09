import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getPortfolioUseCases } from '@/infrastructure/di/container';
import { ProjectDetailTemplate } from '@/presentation/components/project/ProjectDetailTemplate';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const { getPortfolioOverview } = getPortfolioUseCases();
  const overview = await getPortfolioOverview.execute();

  const slugs = new Set<string>();
  overview.projects.forEach((p) => {
    slugs.add(p.slug);
    slugs.add(p.slug.replace(/^website-/, ''));
    slugs.add(p.slug.replace(/-robot-/, '-'));
  });

  return Array.from(slugs).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { getProjectDetail } = getPortfolioUseCases();
  const project = await getProjectDetail.execute(slug);

  if (!project) {
    return {
      title: 'Proyek Tidak Ditemukan — Flight Deck Formal',
    };
  }

  return {
    title: `${project.title} (${project.id}) — Flight Deck Formal`,
    description: project.description,
    openGraph: {
      title: `${project.title} — Rifqi Fadhil Abrar`,
      description: project.description,
      type: 'article',
    },
  };
}

async function ProjectDetailContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { getPortfolioOverview, getProjectDetail } = getPortfolioUseCases();

  const [project, overview] = await Promise.all([
    getProjectDetail.execute(slug),
    getPortfolioOverview.execute(),
  ]);

  if (!project) {
    notFound();
  }

  // Calculate previous and next projects for navigation
  const allProjects = overview.projects;
  const currentIndex = allProjects.findIndex(
    (p) => p.slug === project.slug || p.id === project.id
  );

  const prevProject =
    currentIndex > 0
      ? {
          slug: allProjects[currentIndex - 1].slug,
          title: allProjects[currentIndex - 1].title,
          id: allProjects[currentIndex - 1].id,
        }
      : null;

  const nextProject =
    currentIndex >= 0 && currentIndex < allProjects.length - 1
      ? {
          slug: allProjects[currentIndex + 1].slug,
          title: allProjects[currentIndex + 1].title,
          id: allProjects[currentIndex + 1].id,
        }
      : null;

  return (
    <ProjectDetailTemplate
      project={project}
      prevProject={prevProject}
      nextProject={nextProject}
      email={overview.profile.email}
    />
  );
}

function ProjectDetailSkeleton() {
  return (
    <div className="relative min-h-screen bg-[#F6F4EF] text-[#14181F] animate-pulse">
      <header className="bar">
        <div className="max-w-[1240px] mx-auto py-2 px-6 flex items-center justify-between">
          <span className="font-serif text-[20px] font-medium">Rifqi Fadhil Abrar</span>
          <span className="mono text-[12px] text-[#4A5160]">MEMUAT TELEMETRI...</span>
        </div>
      </header>
      <main className="max-w-[1160px] mx-auto pt-[108px] px-7 pb-18">
        <div className="panel p-9 sm:p-11 mb-8">
          <div className="h-6 w-24 bg-[#EAE6DD] rounded mb-4" />
          <div className="h-12 w-3/4 bg-[#EAE6DD] rounded mb-4" />
          <div className="h-6 w-1/2 bg-[#EAE6DD] rounded" />
        </div>
      </main>
    </div>
  );
}

export default function ProjectDetailPage({ params }: PageProps) {
  return (
    <Suspense fallback={<ProjectDetailSkeleton />}>
      <ProjectDetailContent params={params} />
    </Suspense>
  );
}
