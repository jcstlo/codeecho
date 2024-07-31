import { TextField } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import Typography from '@mui/material/Typography';
import { monospaceFontTheme, headingFontTheme } from './Themes';

export function ExampleComponent() {
    return <>
      <ThemeProvider theme={headingFontTheme}>
        <Typography align="center" mt="15px" mb="15px">Example:</Typography>
      </ThemeProvider>
      <ThemeProvider theme={monospaceFontTheme}>
        <div className="example flex-container center-both-axes">
          <div className="example-input-box">
            <Typography align="center">Input</Typography>
            <TextField
              id="example-input"
              multiline
              value={"hello {{x}}!"}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <Typography variant="h2" ml="15px" mr="15px">+</Typography>
          <div className="example-var">
            <Typography align="center">x: 3 lines</Typography>
            <TextField
              id="example-input"
              multiline
              value={"world\nstars\nuniverse"}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <Typography variant="h2" ml="15px" mr="15px">=</Typography>
          <div className="example-output-box">
            <Typography align="center">Output</Typography>
            <TextField
              id="example-input"
              multiline
              value={"hello world!\nhello stars!\nhello universe!"}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
        </div>
      </ThemeProvider>
    </>
}