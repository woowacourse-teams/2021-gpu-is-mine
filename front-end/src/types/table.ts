import { ReactNode } from "react";

export type Row = Record<string, ReactNode>;

export type Order = "asc" | "desc";

export interface Field {
  name: string;
  selector: string;
  isSortable: boolean;
}
