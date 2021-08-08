import React, { useRef, useState, useEffect } from "react";
import { default as LabList } from "./labList";

const Lab = ({ apiService }) => {
  const formRef = useRef();
  const nameRef = useRef();

  const [labs, setLabs] = useState([]);
  useEffect(() => {
    apiService
      .getLabs() //
      .then((labs) => setLabs(labs));
  }, [apiService]);

  const onSubmit = (e) => {
    console.log(nameRef.current.value);
    e.preventDefault();
    const lab = {
      name: nameRef.current.value || "",
    };
    formRef.current.reset();
    console.log(lab);
    apiService.saveLab(lab);
  };

  return (
    <section>
      <section>
        <h2>랩 관리</h2>
        <form ref={formRef} onSubmit={(e) => e.preventDefault()}>
          <label>
            lab name
            <input ref={nameRef} type="text" name="name" />
          </label>
          <button name="saveLab" onClick={onSubmit}>
            post
          </button>
        </form>
        <LabList labs={labs} />
      </section>
    </section>
  );
};

export default Lab;
