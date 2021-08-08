import { TableHTMLAttributes } from "react";
import { useTable } from "../../hooks";
import Text from "../Text/Text";
import TableHeader from "./TableHeader";
import { StyledTable, StyledBody, StyledRow, StyledCell } from "./Table.styled";
import { Field, Row, Order } from "./type";

interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  fields: Field[];
  rows: Row[];
}

// TODO: <HELP> lint 에러 고치느라 타입가드를 해줬는데도 적용이 안돼서 as 사용
// 해당 sort 함수의 위치? 여기 or util로 분리
const sortRowsByField = (rows: Row[], field: string, order: Order) =>
  rows.slice().sort((a, b) => {
    if (!a[field]) {
      return 1;
    }

    if (!b[field]) {
      return -1;
    }

    if (typeof a[field] === "string" && typeof b[field] === "string") {
      const value1 = a[field] as string;
      const value2 = b[field] as string;

      const value = value1.localeCompare(value2, navigator.language, { numeric: true });
      return order === "asc" ? value : value * -1;
    }

    if (typeof a[field] === "number" && typeof b[field] === "number") {
      const value1 = a[field] as number;
      const value2 = b[field] as number;

      return order === "asc" ? value1 - value2 : value2 - value1;
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
        {sortedRows.map((row, rowIndex) => (
          // eslint-disable-next-line react/no-array-index-key
          <StyledRow key={rowIndex}>
            {Object.values(row).map((value, cellIndex) => (
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
