import { ReactNode } from "react";

export type Row = {
  id: number;
  data: Record<string, ReactNode>;
};

export type Order = "asc" | "desc";

export interface Field {
  name: string;
  selector: string;
  isSortable: boolean;
}
