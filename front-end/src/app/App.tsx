import GlobalStyle from "../styles/GlobalStyle";
import ThemeProvider from "../styles/ThemeProvider";
import { Wrapper } from "./App.styled";

const App = () => (
  <ThemeProvider>
    <Wrapper>Hello, world! 안녕하세요 반갑습니다</Wrapper>
    <GlobalStyle />
  </ThemeProvider>
);

export default App;
