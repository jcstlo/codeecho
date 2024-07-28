import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import './App.css'
import { useState } from 'react';

function App() {
  const [sourceCode, setSourceCode] = useState("")

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
    </>
  )
}

export default App
