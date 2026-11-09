export interface ExternalLink {
  readonly label: string;
  readonly url: string;
}

export interface Profile {
  readonly name: string;
  readonly callsign: string;
  readonly title: string;
  readonly studentId: string;
  readonly university: string;
  readonly faculty: string;
  readonly studyProgram: string;
  readonly email: string;
  readonly frequencyCode: string;
  readonly locationOrigin: string;
  readonly locationCurrent: string;
  readonly bioSummary: string;
  readonly photoUrl?: string;
  readonly cvUrl: string;
  readonly links: readonly ExternalLink[];
}
