import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import './App.css'
import { useState } from 'react';

function App() {
  const [sourceCode, setSourceCode] = useState("")
  const [templateVariables, setTemplateVariables] = useState({})
    // templateVariables is an object of variableName:variableTextField pairs

  function updateTemplateVariablesFromSource(inputCode: string) {
    let oldTemplateVariables: any = templateVariables;
    let newTemplateVariables: any = {};

    const tempVarRegex = /{{([^ {}]*)}}/g;
    const found = inputCode.match(tempVarRegex);

    found?.forEach((item, index) => {
      let extractedKey = item.slice(2, -2); // remove "{{" and "}}"
      Object.defineProperty(newTemplateVariables, extractedKey, {value: index, writable: true, enumerable: true});
    });

    // check if oldTemplateVariables has values to carry over
    for (const property in newTemplateVariables) {
      if (Object.keys(oldTemplateVariables).includes(property)) {
        newTemplateVariables[property] = oldTemplateVariables[property];
      }
    }
    setTemplateVariables(newTemplateVariables);
  }

  function updateTemplateVariablesFromVariables(variableTextField: string, varName: string) {
    let modifiedTemplateVariables: any = {...templateVariables}
    modifiedTemplateVariables[varName] = variableTextField;
    setTemplateVariables(modifiedTemplateVariables);
  }

  let variableTextFields = [<div key="empty"></div>]
  if (Object.keys(templateVariables).length > 0) {
    variableTextFields = Object.keys(templateVariables).map(key => {
      return <div key={key}>
        <h1>{key}</h1>
        <TextField
          multiline
          onChange={e => {
            updateTemplateVariablesFromVariables(e.target.value, key);
          }}
        />
      </div>;
    })
  }

  let outputCode = sourceCode;
  if (Object.keys(templateVariables).length > 0) {
    let copy: any = templateVariables;
    for (const property in copy) {
      let stringToReplace = `{{${property}}}`
      let stringValue = copy[property];
      outputCode = outputCode.replace(stringToReplace, stringValue);
    }
  }

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
          value={outputCode}
        />
      </div>
      {variableTextFields}
    </>
  )
}

export default App
