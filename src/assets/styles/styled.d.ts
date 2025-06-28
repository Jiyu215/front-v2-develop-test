import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
     mode: string;
     colors: {
        primary: string;
        point: string;
        background: {
            light: string;
            gray: string;
            grayLight: string;
            inverse: string;
        };
        text: {
            default: string;       
            muted: string;       
            inverse: string; 
            highlight: string     
        };
        link: string;
        border: string;
        state: {
            success: string;
            error: string;
            warning: string;
            info: string;
        };
        mediaControl: {
            on: string;
            off: string;
        };
        chat: {
            background: string;
            input: string;
            bubble: string;
            bubbleSelf: string;
            name: string;
        };
        hover:string;
    };
    fontSizes: {
        xxs: string;
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
    };
    fonts: {
        primary: string;
        secondary: string;
    };
    fontWeights: {
        light: number;
        regular: number;
        medium: number;
        bold: number;
        black: number;
    };
    lineHeights: {
        sm: number;
        md: number;
        lg: number;
    };
    spacings: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
    };
    borders: {
        radius: {
            sm: string;
            md: string;
            round: string;
        },
        width: string;
    },
  }
}