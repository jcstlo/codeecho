import { ThemeProvider } from '@mui/material';
import { headingFontTheme } from './Themes';
import Typography from '@mui/material/Typography';
import "./Title.css"

export function Title() {
    let githubIconLink = <a target="_blank" rel="noopener noreferrer" href="https://github.com/jcstlo/codeecho">
      <img src="github-logo-light-mode.svg" className="icon-size"></img>
    </a>

    return <>
    <ThemeProvider theme={headingFontTheme}>
      <Typography variant="h3" align="center">
        CodeEcho - interactive code template tool
      </Typography>
      <div className="icon-container-flex-center">{githubIconLink}</div>
      <Typography align="center" mt="15px" className="whitespace">
        {`Enter a code template in the left box, define variables with double curly braces, and see the result in the right box!\nNote: all unique variables must have the same number of lines for the output to render.`}
      </Typography>
    </ThemeProvider>
    </>
}
