import { ReactNode } from "react";

export type Row = Record<string, string | number | null | ReactNode>;

export type Order = "asc" | "desc";

export interface Field {
  name: string;
  selector: string;
  isSortable: boolean;
}
