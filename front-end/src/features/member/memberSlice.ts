import { createSlice } from "@reduxjs/toolkit";
import { MemberType } from "../../types";
import { STATUS } from "../../constants";

interface MyInfo {
  id: number;
  email: string;
  name: string;
  labId: number;
  labName: string;
  memberType: MemberType;
}

type MemberState =
  | { status: typeof STATUS.IDLE; myInfo: null; error: null }
  | { status: typeof STATUS.LOADING; myInfo: null; error: null }
  | { status: typeof STATUS.SUCCEED; myInfo: MyInfo; error: null }
  | { status: typeof STATUS.FAILED; myInfo: null; error: Error };

const initialState: MemberState = {
  status: STATUS.IDLE,
  error: null,
  myInfo: null,
};

const memberSlice = createSlice({
  name: "memberSlice",
  initialState,
  reducers: {
    // logout
  },
});

// export const { , ,  } = memberSlice.actions

export default memberSlice.reducer;
