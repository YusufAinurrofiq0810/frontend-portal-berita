import { Post } from "@/constants/type/post";

export interface Link {
  url: null | string;
  label: string;
  active: boolean;
}

export interface PaginateAllPost {
  current_page: number;
  total: number;
  per_page: number;
  from: number;
  to: number;
  last_page: number;
  prev_page_url: string;
  next_page_url: string;
  first_page_url: string;
  last_page_url: string;
  links: Link[];
  path: string;
  data: Post[];
}
