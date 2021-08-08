import React from "react";
import { default as LabList } from "./labList";

const Lab = ({ apiService }) => {
  return (
    <section>
      <section>
        <h2>랩 관리</h2>
        <form>
          <label>
            lab name
            <input type="text" name="labName" />
          </label>
          <input type="submit" value="등록" />
        </form>
        <LabList apiService={apiService} />
      </section>
    </section>
  );
};

export default Lab;
