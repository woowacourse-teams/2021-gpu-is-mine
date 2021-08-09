import { TableHTMLAttributes } from "react";
import { useTable } from "../../hooks";
import Text from "../Text/Text";
import TableHeader from "./TableHeader";
import { StyledTable, StyledBody, StyledRow, StyledCell } from "./Table.styled";
import { Field, Row, Order } from "../../types";

interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  fields: Field[];
  rows: Row[];
}

const sortRowsByField = (rows: Row[], field: string, order: Order) =>
  rows.slice().sort((a, b) => {
    const valueA = a.data[field];
    const valueB = b.data[field];

    if (valueA === null || valueA === undefined || valueA === "") {
      return 1;
    }

    if (valueB === null || valueB === undefined || valueB === "") {
      return -1;
    }

    if (typeof valueA === "string" && typeof valueB === "string") {
      const value = valueA.localeCompare(valueB, navigator.language, { numeric: true });
      return order === "asc" ? value : value * -1;
    }

    if (typeof valueA === "number" && typeof valueB === "number") {
      return order === "asc" ? valueA - valueB : valueB - valueA;
    }

    return 0;
  });

const Table = ({ fields, rows, ...rest }: TableProps) => {
  const { order, selectedField, onFieldClick } = useTable();

  const sortedRows = sortRowsByField(rows, selectedField, order);

  return (
    <StyledTable {...rest}>
      <TableHeader
        fields={fields}
        order={order}
        selectedField={selectedField}
        onFieldClick={onFieldClick}
      />

      <StyledBody>
        {sortedRows.map(({ id, data }) => (
          // eslint-disable-next-line react/no-array-index-key
          <StyledRow key={id}>
            {Object.values(data).map((value, cellIndex) => (
              // eslint-disable-next-line react/no-array-index-key
              <StyledCell key={cellIndex}>
                <Text size="md" weight="regular">
                  {value}
                </Text>
              </StyledCell>
            ))}
          </StyledRow>
        ))}
      </StyledBody>
    </StyledTable>
  );
};

export default Table;
