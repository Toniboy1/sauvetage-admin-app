import React from 'react'
import Head from 'next/head'

import Typography from '@mui/material/Typography'
import Link from '../components/Link'
import { styled } from '@mui/material'

const Root = styled('div')(({ theme }) => {
  return {
    textAlign: 'center',
    paddingTop: theme.spacing(4),
  }
})

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
