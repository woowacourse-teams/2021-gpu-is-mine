import { TableHTMLAttributes } from "react";
import { useTable } from "../../hooks";
import Text from "../Text/Text";
import TableHeader from "./TableHeader";
import { StyledTable, StyledBody, StyledRow, StyledCell } from "./Table.styled";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Row = Record<string, any>;

type Order = "asc" | "desc";

interface Field {
  name: string;
  selector: string;
  isSortable: boolean;
}

interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  fields: Field[];
  rows: Row[];
}

const sortRowsByField = (rows: Row[], field: string, order: Order) =>
  rows.slice().sort((a, b) => {
    if (!a[field]) {
      return 1;
    }

    if (!a[field]) {
      return -1;
    }

    const value = a[field].localeCompare(b[field], navigator.language, { numeric: true });

    return order === "asc" ? value : value * -1;
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
        {sortedRows.map((row, idx) => (
          <StyledRow key={idx}>
            {Object.values(row).map((value, cell_idx) => (
              <StyledCell key={cell_idx}>
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
