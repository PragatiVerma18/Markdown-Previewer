import React, { useState } from "react";
import "./App.css";
import marked from "marked";
import { ThemeProvider } from "styled-components";

import Toolbar from "./Components/Toolbar";
import Previewer from "./Components/Previewer";
import Editor from "./Components/Editor";
import ThemeBox from "./Components/ThemeBox";
import { GlobalStyles } from "./utils/GlobalStyle";
import {
  lightTheme,
  darkTheme,
  oceanTheme,
  quietTheme,
  marvelTheme,
} from "./utils/Themes";
import { useTheme } from "./utils/useTheme";

marked.setOptions({
  breaks: true,
});

const App = () => {
  const [markdown, setMarkdown] = useState(placeholder);
  const [theme, setMode, mountedComponent] = useTheme();

  const themeMode = () => {
    switch (theme) {
      case "light":
        return lightTheme;
      case "dark":
        return darkTheme;
      case "ocean":
        return oceanTheme;
      case "quiet":
        return quietTheme;
      case "marvel":
        return marvelTheme;
      default:
        return lightTheme;
    }
  };

  if (!mountedComponent) return <div />;
  console.log(theme);
  return (
    <ThemeProvider theme={themeMode()}>
      <>
        <GlobalStyles />
        <div className="container">
          <h1 className="is-size-1 has-text-weight-bold has-text-centered">
            React Markdown Previewer
          </h1>
          <ThemeBox setMode={setMode} />
          <div className="AppWrap columns">
            <div className="EditorWrap column">
              <Toolbar text="Editor" />
              <Editor
                markdown={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
              />
            </div>
            <div className="PreviewerWrap column">
              <Toolbar text="Previewer" />
              <Previewer markdown={markdown} />
            </div>
          </div>
        </div>
      </>
    </ThemeProvider>
  );
};

const placeholder = `# Welcome to my React Markdown Previewer!
## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.
\`\`\`
// this is multi-line code:
function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.
There's also [links](https://github.com/PragatiVerma18), and
> Block Quotes!
And if you want to get really crazy, even tables:
Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.
- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.
1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:
![React Logo w/ Text](https://goo.gl/Umyytc)
`;

export default App;
