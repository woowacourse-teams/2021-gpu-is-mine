import { Text } from "../../components";
import { MemberLayout } from "../../features/member";
import { usePathTitle } from "../../hooks";
import { StyledSignupForm } from "./Signup.styled";

const Signup = () => {
  const heading = usePathTitle();

  return (
    <MemberLayout>
      <Text as="h2" srOnly>
        {heading}
      </Text>
      <StyledSignupForm />
    </MemberLayout>
  );
};

export default Signup;
