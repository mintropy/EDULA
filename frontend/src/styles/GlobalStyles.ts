import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset};

  body {
    background-color: ${props => props.theme.bgColor};
    color:  ${props => props.theme.fontColor};
    font-family:'GangwonEdu_OTFBoldA', Times, Arial, Helvetica, sans-serif, serif;
  }
  @font-face {
    font-family: 'GangwonEdu_OTFBoldA';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2201-2@1.0/GangwonEdu_OTFBoldA.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
`;

export default GlobalStyles;
