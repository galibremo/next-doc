interface GlobalLayoutProps {
  children: React.ReactNode;
}

type KeyedObject = {
  [key: string]: string | number | KeyedObject;
};

interface ApiSearchParams {
  page?: number;
  limit?: number;
  sortBy?:
    | "id"
    | "title"
    | "slug"
    | "type"
    | "active"
    | "sortOrder"
    | "createdAt"
    | "updatedAt";
  sortOrder?: "asc" | "desc";
  search?: string;
  from?: string;
  to?: string;
  type?: "INDIVIDUAL" | "BUSINESS";
  active?: boolean;
}

interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data?: T;
  pagination?: Pagination;
  timestamp: string;
  path: string;
  code?: string;
}
interface Pagination {
  totalItems: number;
  limit: number;
  offset: number;
  currentPage: number;
  totalPages: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

interface MediaAsset {
  filename: string;
  secureUrl: string;
  mimeType: string;
  altText?: string;
}
