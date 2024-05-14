import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document';
import { Children } from 'react';
import { AppRegistry } from 'react-native-web';
import {
  DocumentHeadTags,
  DocumentHeadTagsProps,
  documentGetInitialProps,
} from "@mui/material-nextjs/v14-pagesRouter";
import theme, { roboto } from "../lib/theme";

const style = `
html, body, #__next {
  -webkit-overflow-scrolling: touch;
}
#__next {
  display: flex;
  flex-direction: column;
  height: 100%;
}
html {
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
}
body {
  /* Allows you to scroll below the viewport; default value is visible */
  overflow-y: auto;
  overscroll-behavior-y: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -ms-overflow-style: scrollbar;
}
`;

const useExpo = process.env.NEXT_PUBLIC_USE_EXPO === 'true';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    if (useExpo) {
      AppRegistry.registerComponent("main", () => Main);
      const { getStyleElement } = AppRegistry.getApplication("main");
      const initialProps = await Document.getInitialProps(ctx);
      const styles = [
        <style
          key="react-native-style"
          dangerouslySetInnerHTML={{ __html: style }}
        />,
        getStyleElement(),
      ];
      return { ...initialProps, styles: Children.toArray(styles) };
    } else {
      const initialProps = await documentGetInitialProps(ctx);
      return initialProps;
    }
  }

  render() {
    if (useExpo) {
      return (
        <Html style={{ height: "100%" }}>
          <Head />
          <body style={{ height: "100%", overflow: "hidden" }}>
            <Main />
            <NextScript />
          </body>
        </Html>
      );
    } else {
      return (
        <Html lang="en" className={roboto.className}>
          <Head>
            <meta name="theme-color" content={theme.palette.primary.main} />
            <link rel="shortcut icon" href="/favicon.ico" />
            <meta name="emotion-insertion-point" content="" />
            <DocumentHeadTags {...this.props as unknown as DocumentHeadTagsProps} />
          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
      );
    }
  }
}
