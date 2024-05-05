import React from 'react'
import Head from 'next/head'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material'
import Link from '../components/Link'

/**
 * Root component for the error page.
 */
const Root = styled('div')(({ theme }) => {
  return {
    textAlign: 'center',
    paddingTop: theme.spacing(4),
  }
})

/**
 * Renders the error page.
 *
 * @returns The JSX element representing the error page.
 */
export default function ErrorPage() {
  return (
    <React.Fragment>
      <Head>
        <title>Error</title>
      </Head>
      <Root>
        <Typography gutterBottom>
          <Link href="/home">Go back to home</Link>
        </Typography>
      </Root>
    </React.Fragment>
  )
}
