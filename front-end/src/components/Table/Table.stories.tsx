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
    name: "나이",
    selector: "age",
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
    name: "이름1",
    age: 20,
    email: "test3@test.com",
    memberType: "user",
    etc: <Button color="primary">상세</Button>,
  },
  { name: "이름2", age: 22, email: "test2@test.com", memberType: "manager", etc: "" },
  { name: "이름3", age: 9, email: "test1@test.com", memberType: "user", etc: "" },
  { name: "이름4", age: 31, email: "test0@test.com", memberType: "", etc: "" },
  { name: "이름10", age: 17, email: "test10@test.com", memberType: null, etc: "" },
];

Default.args = {
  fields,
  rows: data,
};
