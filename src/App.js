import './App.css';
import { useState } from "react";
import { marked } from 'marked';

function App() {

  const [markdown, setMarkdown] = useState(
    `# Welcome to my React Markdown Previewer!

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

There's also [links](https://www.freecodecamp.org), and
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


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![React Logo](data:image/png;base64,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)`);


  console.log(markdown);
  let fcc = marked(markdown, {breaks: true});

  return (
    <div className="App container-fluid">
      <div className="col-md-12">
        <h1>Live Markdown Preview</h1>
        <hr />
      </div>
      <div className="row">
        <div className="col-md-6">
          <form>
            <h2>Enter Markdown</h2>
            <textarea
              id="editor"
              as="textarea"
              placeholder=""
              value={markdown}
              type="text"
              onChange={(e) => setMarkdown(e.target.value)}></textarea>
          </form>
        </div>
        <div className="col-md-6">
          <h2>Preview</h2>
          <div id="preview" className="well" dangerouslySetInnerHTML={{ __html: fcc }}>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
