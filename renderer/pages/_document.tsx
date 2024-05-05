import React from 'react'
import {
  Html,
  Head,
  Main,
  NextScript,
  DocumentProps,
  DocumentContext,
} from 'next/document'
import {
  DocumentHeadTags,
  DocumentHeadTagsProps,
  documentGetInitialProps,
} from '@mui/material-nextjs/v14-pagesRouter'
import theme, { roboto } from '../lib/theme'

/**
 * Renders the custom document for the Next.js application.
 *
 * @param props - The props for the document component.
 * @returns The rendered document component.
 */
export default function MyDocument(
  props: DocumentProps & DocumentHeadTagsProps
) {
  return (
    <Html lang="en" className={roboto.className}>
      <Head>
        <meta name="theme-color" content={theme.palette.primary.main} />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="emotion-insertion-point" content="" />
        <DocumentHeadTags {...props} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
/**
 * Retrieves the initial props for the document component.
 *
 * @static
 * @async
 * @param {DocumentContext} ctx - The document context.
 * @returns {Promise<DocumentProps>} The final props for the document component.
 */
MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const finalProps = await documentGetInitialProps(ctx)
  return finalProps
}
