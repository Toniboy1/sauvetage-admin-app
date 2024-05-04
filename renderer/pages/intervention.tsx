import React from 'react'
import Head from 'next/head'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Link from '../components/Link'
import { styled } from '@mui/material'
import DateTimeIntervention from '../components/form/time'

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
        <title>Rapport d'intervention</title>
      </Head>
      <Root>
        <DateTimeIntervention/>
      </Root>
    </React.Fragment>
  )
}
