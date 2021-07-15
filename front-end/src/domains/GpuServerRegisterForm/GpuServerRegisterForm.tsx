import useForm from "../../hooks/useForm/useForm";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { StyledForm } from "./GpuServerRegisterForm.styled";

const GpuServerRegisterForm = () => {
  const { form, submit, useInput } = useForm((data) => {
    console.dir(data);
  });

  const serverNameInputProps = useInput("", {
    name: "serverName",
    label: "서버 이름",
  });
  const memorySizeInputProps = useInput("", {
    name: "memorySize",
    label: "RAM 용량(GB)",
  });
  const diskSizeInputProps = useInput("", {
    name: "diskSize",
    label: "디스크 용랑(GB)",
  });
  const performanceInputProps = useInput("", {
    name: "performance",
    label: "성능(TFLOPS)",
  });
  const deviceNameInputProps = useInput("", {
    name: "deviceName",
    label: "GPU 장치명",
  });

  return (
    <StyledForm {...form}>
      <Input size="sm" {...serverNameInputProps} />
      <Input size="sm" {...memorySizeInputProps} />
      <Input size="sm" {...diskSizeInputProps} />
      <Input size="sm" {...performanceInputProps} />
      <Input size="sm" {...deviceNameInputProps} />
      <Button className="submit" color="secondary" {...submit}>
        제출
      </Button>
    </StyledForm>
  );
};

export default GpuServerRegisterForm;
