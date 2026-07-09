export interface Lead {
  id: string;
  nome: string;
  whatsapp: string;
  email: string;
  dor_principal?: string;
  identificacao?: string;
  melhor_horario?: string;
  origem?: string;
  created_at: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  description?: string;
  category?: string;
  content: string;
  cover_image?: string;
  published: boolean;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description?: string;
  price?: number;
  type?: 'curso' | 'material' | 'formacao';
  status: 'draft' | 'active' | 'coming_soon';
  cta_url?: string;
  cover_image?: string;
  created_at: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
  sort_order: number;
  active: boolean;
}

export interface Database {
  public: {
    Tables: {
      leads: {
        Row: Lead;
        Insert: Omit<Lead, 'id' | 'created_at'>;
      };
      articles: {
        Row: Article;
        Insert: Omit<Article, 'id' | 'created_at' | 'updated_at'>;
      };
      products: {
        Row: Product;
        Insert: Omit<Product, 'id' | 'created_at'>;
      };
      faqs: {
        Row: FAQ;
        Insert: Omit<FAQ, 'id'>;
      };
    };
  };
}
