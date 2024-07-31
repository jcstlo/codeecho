import { TextField } from '@mui/material';
import './App.css'
import { useState } from 'react';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import Typography from '@mui/material/Typography';

function App() {
  const [sourceCode, setSourceCode] = useState("")
  const [templateVariables, setTemplateVariables] = useState({})
    // templateVariables is an object of variableName:variableTextField pairs

  const monospaceFontTheme = createTheme({
    typography: {
      fontFamily: "Martian Mono",
      fontSize: 12,
    },
  });

  const headingFontTheme = createTheme({
    typography: {
      fontFamily: "Open Sans",
    },
  });

  function updateTemplateVariablesFromSource(inputCode: string) {
    let oldTemplateVariables: any = templateVariables;
    let newTemplateVariables: any = {};

    const tempVarRegex = /{{([^ {}]*)}}/g;
    const found = inputCode.match(tempVarRegex);

    found?.forEach((item, index) => {
      let extractedKey = item.slice(2, -2); // remove "{{" and "}}"
      // TODO: refactor so the value is a list already instead of a string delimited by \n
      Object.defineProperty(newTemplateVariables, extractedKey, {value: index.toString(), writable: true, enumerable: true});
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

  function numberOfVariableInstances(propertyName: string) {
    let copyTemplateVariables: any = {...templateVariables};
    let s = copyTemplateVariables[propertyName];
    let array = s.split(/\r?\n/);
    return array.length;
  }

  let variableTextFields = [<div key="empty"></div>]
  if (Object.keys(templateVariables).length > 0) {
    variableTextFields = Object.keys(templateVariables).map(key => {
      let numInstances = numberOfVariableInstances(key);
      return <div key={key}>
        <Typography variant="h6" className="var-textfield-margin">
          {`${key}: ${numInstances} ${numInstances>1?"lines":"line"}`}
        </Typography>
        <TextField
          multiline
          fullWidth
          minRows={2}
          maxRows={6}
          onChange={e => {
            updateTemplateVariablesFromVariables(e.target.value, key);
          }}
        />
      </div>;
    })
  }

  function createObjectOfPropertyLists() {
    // TODO: to be refactored into the main React object
    let outputObject = {};
    let copyTemplateVariables: any = {...templateVariables};
    for (const property in templateVariables) {
      let s = copyTemplateVariables[property];
      let array = s.split(/\r?\n/)
      Object.defineProperty(outputObject, property, {value: array, writable: true, enumerable: true});
    }

    return outputObject;
  }

  function checkEqualVariableInstances(obj: any) {
    // returns # of variable instances, or -1 if variable instance count is inconsistent across all variables
    let firstPropertyFlag = true;
    let expectedInstances = 0;
    for (const property in obj) {
      if (firstPropertyFlag) {
        expectedInstances = obj[property].length;
        firstPropertyFlag = false;
      } else {
        if (obj[property].length != expectedInstances) {
          return -1;
        }
      }
    }

    return expectedInstances;
  }

  let propertyListsObject: any = createObjectOfPropertyLists();
  const instancesCount = checkEqualVariableInstances(propertyListsObject);
  console.log(`instancesCount = ${instancesCount}`);

  let finalOutputCode = "";
  if (instancesCount > 0) {
    for (let i = 0; i < instancesCount; i++) {
      let intermediateOutputCode = sourceCode;
      for (const property in propertyListsObject) {
        let stringToReplace = `{{${property}}}`
        let stringToReplaceRegexGlobal = new RegExp(stringToReplace, "g")
        let stringValue = propertyListsObject[property][i]
        intermediateOutputCode = intermediateOutputCode.replace(stringToReplaceRegexGlobal, stringValue)
      }
      finalOutputCode = finalOutputCode.concat(intermediateOutputCode + '\n');
    }
  } else if (instancesCount == -1) {
    finalOutputCode = "ERROR: There are an unequal amount of lines across all variables!"
  } else {
    finalOutputCode = sourceCode;
  }

  return (
    <div className="flex-container">
        <div className="flex-item-equal-width right-padding">
            <ThemeProvider theme={headingFontTheme}>
              <Typography variant="h6">Input</Typography>
            </ThemeProvider>
            <ThemeProvider theme={monospaceFontTheme}>
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
            </ThemeProvider>
            <ThemeProvider theme={headingFontTheme}>
              {variableTextFields}
            </ThemeProvider>
            </div>
        <div className="flex-item-equal-width left-padding">
            <ThemeProvider theme={headingFontTheme}>
              <Typography variant="h6">Output</Typography>
            </ThemeProvider>
            <ThemeProvider theme={monospaceFontTheme}>
              <TextField
              id="code-output"
              placeholder="Output"
              multiline
              minRows={6}
              maxRows={30}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              value={finalOutputCode}
              />
            </ThemeProvider>
            </div>
      </div>
  )
}

export default App
