import React from 'react'
import Head from 'next/head'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Link from '../components/Link'
import { styled } from '@mui/material'
import DateTimeIntervention from '../components/form/time'
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
        <title>Rapport d'intervention</title>
      </Head>
      <Root>
        <DateTimeIntervention/>
        <People labelText='Pilote' />
        <People labelText='Equipiers' />
      </Root>
    </React.Fragment>
  )
}
