export interface DocSection {
  id: string;
  title: string;
  slug: string;
  order: number;
}

export interface DocPage {
  id: string;
  title: string;
  slug: string;
  sectionId: string;
  content: string;
  order: number;
}
