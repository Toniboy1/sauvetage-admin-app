import React from 'react'
import Head from 'next/head'
import { styled } from '@mui/material'
import People from '../components/form/people'

const Root = styled('div')(({ theme }) => {
  return {
    textAlign: 'center',
    paddingTop: theme.spacing(4),
  }
})

export default function NextPage() {
  return (
    <React.Fragment>
      <Head>
        <title>Sauveteurs</title>
      </Head>
      <Root>
        <People/>
      </Root>
    </React.Fragment>
  )
}
