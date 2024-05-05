import React from 'react'
import Head from 'next/head'
import { styled } from '@mui/material'
import DateTimeIntervention from '../components/time'
import People from '../components/people'

/**
 * Root component for the intervention page.
 */
const Root = styled('div')(({ theme }) => {
  return {
    textAlign: 'center',
    paddingTop: theme.spacing(4),
  }
})

/**
 * Renders the Intervention page.
 * 
 * @returns The JSX element representing the Intervention page.
 */
export default function Intervention() {
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
