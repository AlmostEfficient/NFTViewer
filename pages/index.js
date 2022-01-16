import { useState } from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Box, Input, Flex, InputGroup, InputRightElement } from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'
import Header from '../components/Header'
import Networks from '../components/Networks'
// import Input from '../components/Input'

export default function Home() {
  const [contract, setContract] = useState('')
  const [network, setNetwork] = useState('kovan')

  // set address 
  const setAddress = (e) => {
    console.log("Address set to: " + e.target.value)
    setContract(e.target.value)
  }

  return (
    <div className={styles.root}>
      <Head>
        <title>Testnet NFT viewer</title>
        <meta name="description" content="A better NFT viewer for EVM testnets" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔍</text></svg>"/>
      </Head>

      <Header />

      <Flex justifyContent='center' alignItems='center' flexDirection='column' mt={8}>
        <Networks Network={network} selectNetwork={setNetwork} />
        <Box mt={6}>
          <InputGroup>
            <Input size='lg' placeholder='Enter address' onChange={setAddress} value={contract} />
            <InputRightElement children={<CheckIcon color='green.500' />} />
          </InputGroup>
        </Box>
      </Flex>
      

      <main className={styles.main}>

      </main>

      <footer className={styles.footer}>
        <a
          href="https://twitter.com/almostEfficient/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made by Raza
        </a>
      </footer>
    </div>
  )
}
