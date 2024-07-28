import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import './App.css'
import { useState } from 'react';

function App() {
  const [sourceCode, setSourceCode] = useState("")
  const [templateVariables, setTemplateVariables] = useState({})
    // templateVariables is an object of (variableName, variableInstanceList) pairs

  function updateTemplateVariablesFromSource(inputCode: string) {
    // let oldTemplateVariables = templateVariables;
    let newTemplateVariables = {};

    const tempVarRegex = /{{([^ {}]*)}}/g;
    const found = inputCode.match(tempVarRegex);

    found?.forEach((item, index) => {
      let extractedKey = item.slice(2, -2); // remove "{{" and "}}"
      Object.defineProperty(newTemplateVariables, extractedKey, {value: index, writable: true, enumerable: true});
    });
    // TODO: check if oldTemplateVariables has values to carry over
    setTemplateVariables(newTemplateVariables);
  }

  // TODO: function updateTemplateVariablesFromVariables(variableTextField: string)

  let variableTextFields = [<div key="empty"></div>]
  if (Object.keys(templateVariables).length > 0) {
    variableTextFields = Object.keys(templateVariables).map(key => {
      // TODO: replace <p> with a TemplateVariableTextField
      return <p key={key}>{key}</p>;
    })
  }

  // TODO: create outputCode
    // if templateVariables.length > 0:
      // for each property in templateVariables:
        // if property value is not empty:
          // replace inputString {{.*}} with property value
      // outputCode = final modified code
    // else:
      // outputCode = sourceCode

  return (
    <>
      <Button variant="contained">Hello world</Button>
      <div className="flex-container">
        <TextField
          id="code-input"
          placeholder="Place source code here"
          rows={6}
          multiline
          fullWidth
          value={sourceCode}
          onChange={e => {
            setSourceCode(e.target.value);
            updateTemplateVariablesFromSource(e.target.value);
          }}
        />
        <TextField
          id="code-output"
          placeholder="Output"
          rows={6}
          multiline
          fullWidth
          InputProps={{
            readOnly: true,
          }}
          value={sourceCode}
        />
      </div>
      {variableTextFields}
    </>
  )
}

export default App
