import { TableHTMLAttributes } from "react";
import { usePagination, useTable } from "../../hooks";
import Text from "../Text/Text";
import TableHeader from "./TableHeader";
import Pagination from "./Pagination";
import { StyledContainer, StyledTable, StyledBody, StyledRow, StyledCell } from "./Table.styled";
import { Field, Row, Order } from "../../types";

interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  fields: Field[];
  rows: Row[];
  rowCountPerPage: number;
}

const sortRowsByField = (rows: Row[], field: string, order: Order) =>
  rows.slice().sort((a, b) => {
    const valueA = a.data[field]?.priority ?? a.data[field]?.value;
    const valueB = b.data[field]?.priority ?? b.data[field]?.value;

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

const isNumberOrString = (value: unknown) => typeof value === "string" || typeof value === "number";

const Table = ({ fields, rows, rowCountPerPage, ...rest }: TableProps) => {
  const { order, selectedField, onFieldClick } = useTable();

  const {
    currentPage,
    contentsLengthPerPage: rowCount,
    ...paginationProps
  } = usePagination({
    count: rowCountPerPage,
    totalContentsLength: rows.length,
  });

  const sortedRows = sortRowsByField(rows, selectedField, order);

  const currentPageRows = sortedRows.filter(
    (_, idx) => (currentPage - 1) * rowCount <= idx && idx < currentPage * rowCount
  );

  return (
    <StyledContainer>
      <StyledTable {...rest}>
        <TableHeader
          fields={fields}
          order={order}
          selectedField={selectedField}
          onFieldClick={onFieldClick}
        />

        <StyledBody>
          {currentPageRows.map(({ id, data }) => (
            <StyledRow key={id}>
              {Object.values(data).map(({ value }, cellIndex) => (
                // eslint-disable-next-line react/no-array-index-key
                <StyledCell key={cellIndex}>
                  {isNumberOrString(value) ? (
                    <Text size="md" weight="regular">
                      {value}
                    </Text>
                  ) : (
                    value
                  )}
                </StyledCell>
              ))}
            </StyledRow>
          ))}
        </StyledBody>
      </StyledTable>

      <Pagination currentPage={currentPage} {...paginationProps} />
    </StyledContainer>
  );
};

export default Table;
