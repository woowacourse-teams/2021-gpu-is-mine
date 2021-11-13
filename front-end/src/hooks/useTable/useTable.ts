import { useState } from "react";
import type { Order } from "../../types";

const useTable = () => {
  const [order, setOrder] = useState<Order>("asc");
  const [selectedField, setSelectedField] = useState("");

  const onFieldClick = (field: string, isSortable: boolean) => {
    if (!isSortable) return;

    setSelectedField(field);
    setOrder((prev) => (prev === "desc" ? "asc" : "desc"));
  };

  return {
    order,
    selectedField,
    onFieldClick,
  };
};

export default useTable;
