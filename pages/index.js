import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css'
import { Box, Input, Flex, Button } from '@chakra-ui/react'
import Header from '../components/Header'
import Networks from '../components/Networks'
import web3 from 'web3';
import {networkIds} from '../src/utils';

import {
  useNumberInput,
  HStack
} from '@chakra-ui/react'

const placeholder = 'https://lh3.googleusercontent.com/MAhW5Sis-EpanPyVxqxAwJWuU2SahGmcyCjI7TtldcdtGJ1JC8GXhSA0rjqX-neUcCW12LZTO2ZySjD6yWY6WATFx-Fq9MNo4TE9qw'
const apiKey = 'temp';

export default function Home() {
  const [contract, setContract] = useState('')
  const [id, setId] = useState('')
  const [network, setNetwork] = useState('kovan')
  const [img , setImg] = useState(placeholder)
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAddressChange = (e) => {
    web3.utils.isAddress(e.target.value) ? setContract(e.target.value) : setContract('')
    console.log("Address set to: " + e.target.value)
  }

  const getMetadata = () => {
    // Build endpoint from contract address, network, id and api key
    const nId = networkIds[network];
    const endpoint = `https://api.covalenthq.com/v1/${nId}/tokens/${contract}/nft_metadata/${id}/?key=${apiKey}`
    
    try{
      fetch(endpoint)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          // Pull attributes and image url
          // const attributes = data.data.items[0].nftData[0].
          const item = data.data.items[0]
          const metadata = item.nft_data[0].token_url;
          const name = item.contract_name;
          const ticker = item.contract_ticker_symbol;
          const description = item.nft_data[0].external_data.description;
          const attributes = item.nft_data[0].external_data.attributes;
          console.log("image: ", metadata)
          console.log("name: ", name)
          console.log("ticker: ", ticker)
          console.log("description: ", description)
          console.log("attributes: ", attributes)
  
        });
    } catch(err) {
      console.log(err)
    }
  }

  function HookUsage() {
    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
      useNumberInput({
        step: 1,
        min: 0,
        precision: 0,
        value: id,
        onChange: (value) => { setId(value) }
      })
  
    const inc = getIncrementButtonProps()
    const dec = getDecrementButtonProps()
    const input = getInputProps()
  
    return (
      <HStack maxW='190px'>
        <Button size='lg' {...inc}>+</Button>
        <Input size='lg' placeholder='ID' {...input} />
        <Button size='lg' {...dec}>-</Button>
      </HStack>
    )
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
        <Flex mt={6} flexDirection={'row'} alignItems='center' >
          <Input size='lg' w={80} placeholder='Paste contract address' onChange={handleAddressChange} value={contract} />

          {/* <NumberInput size='lg' mx={4}w={24} >
            <NumberInputField placeholder='Enter ID' onChange={handleIdChange} value={id}/>
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput> */}
          <Box mx={5}>
            <HookUsage />
          </Box>

          <Box >
            <Button variantColor='blue' size='lg' onClick={() => getMetadata()}>Refresh</Button>
          </Box>
        </Flex>
        
      </Flex>
      
      <main className={styles.main}>
        {/* Two boxes side by side inside a flexbox, one for an image, another for a Prism.js code block */}
        <Flex>
          <Box>
            <Image src={img} alt='NFT' width={300} height={300} />
          </Box>
          <Box>
            <pre>
              <code>
                {`
                  import { Input } from '@chakra-ui/react'
                  `}
              </code>
            </pre>
          </Box>
        </Flex>

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
