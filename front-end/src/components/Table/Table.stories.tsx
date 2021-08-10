import { ComponentStory, ComponentMeta } from "@storybook/react";
import Button from "../Button/Button";
import Table from "./Table";

export default {
  title: "Components/Table",
  component: Table,
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />;

export const Default = Template.bind({});

const fields = [
  {
    name: "이름",
    selector: "name",
    isSortable: true,
  },
  {
    name: "나이(숫자값)",
    selector: "age",
    isSortable: true,
  },
  {
    name: "나이(문자값)",
    selector: "ageString",
    isSortable: true,
  },
  {
    name: "이메일",
    selector: "email",
    isSortable: true,
  },
  {
    name: "타입",
    selector: "memberType",
    isSortable: true,
  },
  {
    name: "기타",
    selector: "etc",
    isSortable: false,
  },
];

const data = [
  {
    id: 1,
    data: {
      name: { value: "이름1" },
      age: { value: 20 },
      ageString: { value: "20" },
      email: { value: "test3@test.com" },
      memberType: { value: "user" },
      etc: { value: <Button color="primary">상세</Button> },
    },
  },
  {
    id: 2,
    data: {
      name: { value: "이름2" },
      age: { value: 0 },
      ageString: { value: "0" },
      email: { value: "test2@test.com" },
      memberType: { value: "manager" },
      etc: { value: "" },
    },
  },
  {
    id: 3,
    data: {
      name: { value: "이름3" },
      age: { value: 9 },
      ageString: { value: "9" },
      email: { value: "test1@test.com" },
      memberType: { value: "user" },
      etc: { value: "" },
    },
  },
  {
    id: 4,
    data: {
      name: { value: "이름4" },
      age: { value: 31 },
      ageString: { value: "31" },
      email: { value: "test0@test.com" },
      memberType: { value: "" },
      etc: { value: "" },
    },
  },
  {
    id: 5,
    data: {
      name: { value: "이름10" },
      age: { value: 17 },
      ageString: { value: "17" },
      email: { value: "test10@test.com" },
      memberType: { value: null },
      etc: { value: "" },
    },
  },
];

Default.args = {
  fields,
  rows: data,
};
