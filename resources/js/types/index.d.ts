import { Config } from 'ziggy-js';

export type User = {
  id: number;
  name: string;
  role: string;
  email: string;
};

export type Assignment = {
  id: number;
  title: string;
  description: string;
  deadline: Date;
  created_at: string;
  updated_at: string;
};

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};
