import { FONT_L } from '../../constants/styles/styles-fonts';

const getGoogleFonts = () => {
  const style = document.createElement('style');
  style.innerHTML = `
    @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,700');
    @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
  `;
  return style;
};

const getCSSAnimations = () => {
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes lds-dual-ring {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `;
  return style;
};

const getResetStyles = () => {
  const style = document.createElement('style');
  style.innerHTML = `
    * {
      box-sizing: border-box;
      list-style: none;
      margin: 0;
      padding: 0;
      font-weight: normal;
      user-select: none;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
    }

    html,
    body,
    #app-wrapper {
      height: 100%;
    }

    body {
      color: #303030;
      font-family: 'Roboto-Regular', sans-serif;
      font-size: ${FONT_L};
      font-weight: 400;
      line-height: 1.5em;
      min-width: 320px;
      overflow: hidden;
      overscroll-behavior-y: contain;
    }

    .material-icons {
      font-family: 'Material Icons';
      font-weight: normal;
      font-style: normal;
      font-size: 24px;  /* Preferred icon size */
      display: inline-block;
      line-height: 1;
      text-transform: none;
      letter-spacing: normal;
      word-wrap: normal;
      white-space: nowrap;
      direction: ltr;

      /* Support for all WebKit browsers. */
      -webkit-font-smoothing: antialiased;
      /* Support for Safari and Chrome. */
      text-rendering: optimizeLegibility;

      /* Support for Firefox. */
      -moz-osx-font-smoothing: grayscale;

      /* Support for IE. */
      font-feature-settings: 'liga';
    }
  `;
  return style;
};

const getAppStyles = () => {
  const style = document.createElement('style');
  style.innerHTML = `
    #app-wrapper {
    }
  `;
  return style;
};

const getCustomStyles = () => [getGoogleFonts(), getCSSAnimations(), getResetStyles(), getAppStyles()];
export default getCustomStyles;
