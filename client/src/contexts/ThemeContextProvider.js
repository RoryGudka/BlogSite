import {createContext } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';

const ThemeContext = createContext();

const ThemeContextProvider = ({children}) => {
    const theme = createMuiTheme({
        palette: {
            primary: {
                main:'#0076be',
            },
            secondary: {
                main:"#48bf91"
            },
            background: {
                main:"#CFF4D2"
            }
        },
    });
    
    return (
        <ThemeContext.Provider value={{theme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContextProvider;
export {ThemeContext};