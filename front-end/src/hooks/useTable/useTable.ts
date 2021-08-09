import { useState } from "react";
import { Order } from "../../types";

const useTable = () => {
  const [order, setOrder] = useState<Order>("asc");
  const [selectedField, setSelectedField] = useState("");

  const isASC = order === "asc";

  const onFieldClick = (field: string, isSortable: boolean) => {
    if (!isSortable) return;

    setSelectedField(field);
    setOrder(isASC ? "desc" : "asc");
  };

  return {
    order,
    selectedField,
    onFieldClick,
  };
};

export default useTable;
