import type { IPortfolioRepository } from '@/domain/repositories/IPortfolioRepository';
import type { Profile } from '@/domain/entities/Profile';
import type { Project, ProjectCategory } from '@/domain/entities/Project';
import type { Competency } from '@/domain/entities/Competency';
import type { Experience } from '@/domain/entities/Experience';

export class StaticPortfolioRepository implements IPortfolioRepository {
  private readonly profileData: Profile = {
    name: 'Rifqi Fadhil Abrar',
    callsign: 'RF-2026',
    title: 'Mahasiswa S1 Teknik Informatika & Pegiat Robotika / UAV',
    studentId: '255150200111000',
    university: 'Universitas Brawijaya',
    faculty: 'Fakultas Ilmu Komputer (FILKOM)',
    studyProgram: 'S1 Teknik Informatika',
    email: 'rifqifadhilabrar@gmail.com',
    frequencyCode: 'VHF-121.5-UB',
    locationOrigin: 'Lhokseumawe, Aceh (WITM)',
    locationCurrent: 'Malang, Jawa Timur (MLG / WARA)',
    bioSummary:
      'Mahasiswa Teknik Informatika di Universitas Brawijaya yang berfokus pada rekayasa antarmuka web modern, perancangan interaktif yang presisi, serta eksplorasi teknologi sistem robotika & UAV.',
    photoUrl: undefined,
    cvUrl: '#',
    links: [
      { label: 'GitHub', url: 'https://github.com' },
      { label: 'LinkedIn', url: 'https://linkedin.com' },
      { label: 'CV (PDF)', url: '#' },
    ],
  };

  private readonly projectsData: readonly Project[] = [
    {
      id: 'P-01',
      slug: 'website-sge-filkom-ub-2026',
      title: 'Website SGE FILKOM UB 2026',
      role: 'Frontend Developer · Staff IT Solution',
      category: 'web',
      period: 'Feb 2026 — sekarang',
      status: 'Berjalan',
      statusType: 'active',
      org: 'SGE FILKOM UB 2026',
      field: 'Frontend · UI responsif',
      description:
        'Mengubah desain UI menjadi website dengan fitur interaktif dan layout responsif untuk semua perangkat.',
      caseStudyContent:
        'Menerapkan desain UI, membangun fitur interaktif, dan mengoptimalkan layout responsif agar pengalaman tetap konsisten di semua perangkat. Dikerjakan bersama tim IT Solution SGE FILKOM UB 2026.',
      tasks: [
        'Menerapkan desain UI menjadi halaman web responsif',
        'Membangun fitur interaktif navigasi dan komponen avionik',
        'Mengoptimalkan layout responsif di berbagai resolusi layar perangkat',
      ],
      result: 'Website berjalan stabil dengan kecepatan render optimal dan antarmuka ramah pengguna.',
      challenge:
        'Menjaga konsistensi pengalaman visual avionik dan responsivitas interaktif tanpa mengorbankan kecepatan muat awal.',
      approach:
        'Memanfaatkan arsitektur Clean Architecture berbasis Next.js 16 dan Tailwind CSS v4, serta optimasi rendering modular.',
      technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
      metrics: ['Lighthouse Performance 98', 'Responsif 100% Mobile & Desktop'],
      demoUrl: '#',
      repositoryUrl: 'https://github.com',
      thumbnailUrl: '/assets/projects/sge-2026.svg',
      featured: true,
    },
    {
      id: 'P-02',
      slug: 'platform-pit-pkkmb-startup-academy',
      title: 'Platform PIT, PKKMB & Startup Academy',
      role: 'Frontend Developer',
      category: 'web',
      period: 'Jul — Des 2026',
      status: 'Jul — Des 2026',
      statusType: 'active',
      org: 'PIT, PKKMB & Startup Academy FILKOM UB 2026',
      field: 'Frontend · Platform acara',
      description:
        'Antarmuka responsif untuk platform acara dan integrasi fitur website bersama tim.',
      caseStudyContent:
        'Mengembangkan dan menerapkan antarmuka responsif untuk platform acara FILKOM UB 2026, serta mengintegrasikan fitur website bersama tim hingga menjadi platform digital yang ramah pengguna.',
      tasks: [
        'Mengembangkan dan menerapkan antarmuka responsif',
        'Mengintegrasikan fitur website bersama tim',
        'Mendukung platform digital yang ramah pengguna',
      ],
      result: 'Platform berhasil melayani ribuan mahasiswa dan peserta acara secara serentak.',
      challenge:
        'Menyajikan formulir dan dashboard registrasi masal yang intuitif bagi ribuan peserta baru dengan performa stabil.',
      approach:
        'Membangun modul form reaktif, penanganan error informatif, dan pengujian alur pengguna bersama tim IT Solution.',
      technologies: ['Next.js', 'TypeScript', 'REST API', 'Figma'],
      metrics: ['Mendukung 4.000+ pengguna aktif', 'Waktu muat halaman < 1.2 detik'],
      demoUrl: '#',
      repositoryUrl: 'https://github.com',
      thumbnailUrl: '/assets/projects/pit-pkkmb.svg',
      featured: true,
    },
    {
      id: 'P-03',
      slug: 'sistem-elektrik-robot-robotiik',
      title: 'Sistem elektrik robot ROBOTIIK',
      role: 'Electrical Staff · Atyabrama',
      category: 'robotics-uav',
      period: 'Feb 2026 — sekarang',
      status: 'Berjalan',
      statusType: 'active',
      org: 'ROBOTIIK FILKOM UB 2026',
      field: 'Elektrik · Robotika',
      description:
        'Wiring, integrasi komponen, dan troubleshooting agar sistem andal saat pengembangan dan pengujian.',
      caseStudyContent:
        'Mendukung sistem elektrik proyek robot: wiring, integrasi komponen, dan troubleshooting. Bekerja dengan tim agar sistem tetap andal selama pengembangan dan pengujian.',
      tasks: [
        'Merancang dan merapikan wiring sistem elektrik',
        'Mengintegrasikan komponen sensor dan aktuator robot',
        'Melakukan troubleshooting selama pengembangan dan pengujian performa',
      ],
      result: 'Sistem tenaga dan telemetri robot beroperasi andal selama masa riset dan uji coba lapangan.',
      challenge:
        'Kerapatan tata letak modul elektrik di dalam ruang sasis robot serta perlunya proteksi interferensi sinyal kontrol.',
      approach:
        'Isolasi galvanik pada jalur daya motor, pengelompokan jalur sensor, dan penggunaan konektor avionik terkunci.',
      technologies: ['Power Distribution', 'IMU Sensors', 'Hardware Debugging', 'Wiring Avionics'],
      metrics: ['Toleransi tegangan ±0.05V', 'Keandalan operasi sistem 99.8%'],
      demoUrl: '#',
      repositoryUrl: 'https://github.com',
      thumbnailUrl: '/assets/projects/robotiik.svg',
      featured: true,
    },
    {
      id: 'P-04',
      slug: 'ktri-td-2026-ikn',
      title: 'KTRI TD 2026 · IKN',
      role: 'Anggota tim robotika',
      category: 'competition',
      period: '2026',
      status: 'Selesai · Juara 2',
      statusType: 'completed',
      org: 'KTRI TD 2026 · IKN',
      field: 'Robot & UAV',
      description:
        'Kontribusi pada pengembangan dan implementasi sistem robot dan UAV bersama tim.',
      caseStudyContent:
        'Berkontribusi pada pengembangan dan implementasi sistem robot dan UAV bersama tim, dan meraih juara kedua pada KTRI TD 2026 di IKN.',
      tasks: [
        'Berkontribusi pada pengembangan sistem robot dan UAV',
        'Berperan dalam implementasi sistem bersama tim',
        'Meraih Juara 2 pada kompetisi',
      ],
      result: 'Tim meraih Juara 2 pada KTRI TD 2026 di IKN.',
      challenge:
        'Uji terbang taktis di kondisi angin dinamis arena IKN yang menuntut transmisi telemetri tanpa latensi.',
      approach:
        'Optimasi frekuensi radio telemetri dua arah, kalibrasi sensor autopilot, dan protokol checklist prapenerbangan.',
      technologies: ['UAV Telemetry', 'Radio Frequency', 'Autonomous Navigation', 'Robotics Architecture'],
      metrics: ['Peringkat Juara 2 Nasional', 'Latensi telemetri < 50ms'],
      demoUrl: '#',
      repositoryUrl: 'https://github.com',
      thumbnailUrl: '/assets/projects/ktri-uav.svg',
      featured: true,
    },
  ];

  private readonly competenciesData: readonly Competency[] = [
    {
      id: 'c-front',
      category: 'Frontend',
      group: 'frontend',
      skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Desain Responsif', 'Clean UI'],
      proficiencyLevel: 'advanced',
      semanticColorKey: 'frontend',
    },
    {
      id: 'c-code',
      category: 'Pemrograman',
      group: 'programming',
      skills: ['Python', 'TypeScript', 'JavaScript', 'C++', 'Algoritma & Struktur Data'],
      proficiencyLevel: 'advanced',
      semanticColorKey: 'programming',
    },
    {
      id: 'c-sys',
      category: 'Rekayasa Perangkat Lunak',
      group: 'software-eng',
      skills: ['Aplikasi Web', 'Clean Architecture', 'Git Workflow', 'Kerja Tim Berbasis Proyek'],
      proficiencyLevel: 'operational',
      semanticColorKey: 'software-eng',
    },
    {
      id: 'c-uav',
      category: 'Robotika & UAV',
      group: 'avionics-robotics',
      skills: ['Wiring Elektrik', 'Integrasi Komponen', 'Troubleshooting Sistem', 'Telemetri UAV'],
      proficiencyLevel: 'advanced',
      semanticColorKey: 'avionics-robotics',
    },
    {
      id: 'c-ai',
      category: 'Data & AI',
      group: 'data-ai',
      skills: ['Teknologi Berbasis Data', 'Dasar Kecerdasan Buatan', 'Machine Learning Exploratory'],
      proficiencyLevel: 'operational',
      semanticColorKey: 'data-ai',
    },
  ];

  private readonly experiencesData: readonly Experience[] = [
    {
      id: 'exp-1',
      type: 'organization',
      title: 'Staff IT Solution (Frontend)',
      organization: 'PIT & PKKMB FILKOM UB 2026',
      location: 'Malang, Jawa Timur',
      period: 'Jul – Des 2026',
      isCurrent: false,
      description:
        'Mengembangkan antarmuka pengguna website acara, memastikan tampilan responsif di ponsel dan desktop, serta berkolaborasi dengan tim lintas divisi.',
      highlights: [
        'Memimpin implementasi komponen UI responsif untuk ribuan pengguna',
        'Kolaborasi intensif dengan tim desain dan divisi backend',
      ],
    },
    {
      id: 'exp-2',
      type: 'engineering',
      title: 'Staff Divisi Elektrikal Atyabrama',
      organization: 'ROBOTIIK FILKOM UB',
      location: 'Malang, Jawa Timur',
      period: 'Des 2025 – sekarang',
      isCurrent: true,
      description:
        'Mendukung perancangan dan keandalan sistem elektrik proyek robotika selama tahap riset, prototyping, dan pengujian performa.',
      highlights: [
        'Perancangan dan pengujian jalur distribusi daya wahana robotik',
        'Troubleshooting modul sensor avionik dan sistem kendali daya',
      ],
    },
    {
      id: 'exp-3',
      type: 'education',
      title: 'S1 Teknik Informatika',
      organization: 'Universitas Brawijaya, Malang',
      location: 'Malang, Jawa Timur',
      period: 'Agu 2025 – sekarang',
      isCurrent: true,
      description:
        'Mendalami ilmu rekayasa perangkat lunak, sistem komputasi, pengembangan web modern, serta dasar-dasar kecerdasan buatan.',
      highlights: [
        'Fokus pada rekayasa antarmuka web dan sistem komputasi cerdas',
        'Aktif dalam riset perangkat keras dan sistem robotik terapan',
      ],
    },
  ];

  async getProfile(): Promise<Profile> {
    return { ...this.profileData };
  }

  async getProjects(filter?: { category?: ProjectCategory; featured?: boolean }): Promise<readonly Project[]> {
    let result = [...this.projectsData];
    if (filter?.category) {
      result = result.filter((p) => p.category === filter.category);
    }
    if (filter?.featured !== undefined) {
      result = result.filter((p) => p.featured === filter.featured);
    }
    return Object.freeze(result);
  }

  async getProjectBySlug(slug: string): Promise<Project | null> {
    const normalized = slug.toLowerCase().trim();
    const found = this.projectsData.find(
      (p) =>
        p.slug === normalized ||
        p.id.toLowerCase() === normalized ||
        p.slug.replace(/^website-/, '') === normalized.replace(/^website-/, '') ||
        p.slug.replace(/-robot-/, '-') === normalized.replace(/-robot-/, '-')
    );
    return found ? { ...found } : null;
  }

  async getCompetencies(): Promise<readonly Competency[]> {
    return Object.freeze([...this.competenciesData]);
  }

  async getExperiences(): Promise<readonly Experience[]> {
    return Object.freeze([...this.experiencesData]);
  }
}
