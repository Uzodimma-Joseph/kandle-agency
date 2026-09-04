// Core domain types shared across the public site, services layer, and admin panel.
// These mirror the Google Sheets data model described in the project brief
// (LEADS / PROJECTS / MEDIA / SETTINGS / STATS tabs) so the mock layer can be
// swapped for a real Sheets/automation-backed API without changing components.

export type LeadStatus =
  | "new"
  | "contacted"
  | "discovery"
  | "proposal"
  | "negotiation"
  | "won"
  | "onboarding"
  | "in_progress"
  | "completed"
  | "lost";

export interface Lead {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service: string;
  budget?: string;
  timeline?: string;
  message: string;
  status: LeadStatus;
  createdAt: string;
  updatedAt: string;
  lastContacted?: string;
  nextFollowup?: string;
  notes?: LeadNote[];
  source?: string;
}

export interface LeadNote {
  id: string;
  body: string;
  createdAt: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service: string;
  budget?: string;
  timeline?: string;
  message: string;
}

export interface ProjectResult {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  client: string;
  category: string;
  description: string;
  year?: string;
  featured: boolean;
  displayOrder: number;
  coverImage: string;
  size: "large" | "medium" | "small";
  status: "published" | "draft";
  overview?: string;
  challenge?: string;
  approach?: string;
  solution?: string;
  results?: ProjectResult[];
  gallery?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface MediaAsset {
  id: string;
  filename: string;
  url: string;
  type: "image" | "logo" | "document";
  projectId?: string;
  folder: string;
  createdAt: string;
}

export interface StatMetric {
  metric: string;
  value: string;
  label: string;
}

export interface ServiceCapability {
  name: string;
}

export interface Service {
  id: string;
  index: string;
  name: string;
  summary: string;
  capabilities: string[];
}

export interface ApproachStep {
  index: string;
  title: string;
  description: string;
}

export interface SiteContent {
  heroEyebrow: string;
  heroHeadline: string;
  heroSubhead: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
  aboutEyebrow: string;
  aboutHeadline: string;
  aboutBody: string;
  contactHeadline: string;
  contactSubhead: string;
}
