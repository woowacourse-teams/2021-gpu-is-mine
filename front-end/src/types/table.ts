import { ReactNode } from "react";

export type Row = {
  id: number;
  data: Record<string, { priority?: number | string | null; value: ReactNode }>;
};

export type Order = "asc" | "desc";

export interface Field {
  name: string;
  selector: string;
  isSortable: boolean;
}
