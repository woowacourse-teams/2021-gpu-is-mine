import { TableHTMLAttributes } from "react";
import Text from "../Text/Text";
import { StyledHeader, StyledRow, StyledHeadCell, CellSortMark } from "./Table.styled";
import { Field, Order } from "../../types";

interface TableHeaderProps extends TableHTMLAttributes<HTMLTableSectionElement> {
  fields: Field[];
  selectedField: string;
  order: Order;
  onFieldClick: (name: string, isSortable: boolean) => void;
}

const TableHeader = ({ fields, selectedField, order, onFieldClick }: TableHeaderProps) => (
  <StyledHeader>
    <StyledRow>
      {fields.map(({ name, selector, isSortable }) => (
        <StyledHeadCell
          key={selector}
          isSortable={isSortable}
          onClick={() => onFieldClick(selector, isSortable)}
        >
          <Text size="md" weight="bold" as="span">
            {name}
          </Text>
          <Text size="sm" weight="bold" as="span">
            <CellSortMark sortActive={selector === selectedField} isSortable={isSortable}>
              {order === "asc" ? "▲" : "▼"}
            </CellSortMark>
          </Text>
        </StyledHeadCell>
      ))}
    </StyledRow>
  </StyledHeader>
);

export default TableHeader;
