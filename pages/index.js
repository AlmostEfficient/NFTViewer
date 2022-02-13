import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css'
import { Box, Input, Flex, Button, Heading } from '@chakra-ui/react'
import Header from '../components/Header'
import Networks from '../components/Networks'
import Inputs from '../components/Inputs'
import web3 from 'web3';
import {networkIds} from '../src/utils';
import 'highlight.js/styles/default.css';
import hljs from 'highlight.js';
import json from 'highlight.js/lib/languages/json';
hljs.registerLanguage('json', json);

const placeholder = 'https://lh3.googleusercontent.com/MAhW5Sis-EpanPyVxqxAwJWuU2SahGmcyCjI7TtldcdtGJ1JC8GXhSA0rjqX-neUcCW12LZTO2ZySjD6yWY6WATFx-Fq9MNo4TE9qw'
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export default function Home() {
  const [contract, setContract] = useState('0xf4088a95621e2c22d0be1063e517e14f71392ef1')
  const [id, setId] = useState('')
  const [network, setNetwork] = useState('kovan')
  const [img , setImg] = useState(placeholder)
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [metadata, setMetadata] = useState(null)

  useEffect(() => {
    hljs.highlightAll();
  }, []);
  
  // Disable loading 2s after it has been set to true
  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false)
      }, 2000)
    }
  }, [loading])

  const handleAddressChange = (e) => {
    web3.utils.isAddress(e.target.value) ? setContract(e.target.value) : setContract('')
    console.log("Address set to: " + e.target.value)
  }

  const getMetadata = () => {
    setLoading(true);
    // Build endpoint from contract address, network, id and api key
    const nId = networkIds[network];
    const endpoint = `https://api.covalenthq.com/v1/${nId}/tokens/${contract}/nft_metadata/${id}/?key=${apiKey}`
    
    if ( contract === '' || !contract || !id || id === '' || !apiKey) return;

    try{
      fetch(endpoint)
				.then((res) => res.json())
				.then((data) => {
					setResponse(data);
					console.log(data);
					const item = data.data.items[0];
					const uri = item.nft_data[0].token_url;
					const name = item.contract_name;
					const ticker = item.contract_ticker_symbol;
					const description = item.nft_data[0].external_data.description;
					const attributes = item.nft_data[0].external_data.attributes;
          setMetadata({
            name,
            ticker,
            uri,
            description,
            attributes
          })
          // If the URI is a base64 string
          if (uri.includes('base64')) {
            console.log('Base64 detected')
            // Strip and decode
            const base64 = uri.split('base64,')[1];
            const decoded = atob(base64);
            console.log(decoded)
            const parsed  = JSON.parse(decoded);
            setImg(parsed.image);
          }

          // If the URI is a URL 
          if (uri.includes('http')) {
            console.log('URL detected')
            // Fetch JSON from url
            fetch(uri)
              .then((res) => res.json())
              .then((data) => {
                setImg(data.image);
              })
          }

          // Check if the URI is a URL to a json file
          if (uri.includes('json')) {
            console.log('Json detected')
            const parsed = JSON.parse(uri);
            setImg(parsed.image)
          }
				});
    } catch(err) {
      console.log(err)
    }

    setLoading(false);
  }

  const copyURI = () => {
    const el = document.createElement('textarea');
    el.value = metadata.uri;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }


  return (
		<div className={styles.root}>
			<Head>
				<title>Testnet NFT viewer</title>
        <meta name="description" content="A better NFT viewer for EVM testnets" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔍</text></svg>"/>
        <link rel="stylesheet" href="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.3.2/build/styles/default.min.css"></link>
			</Head>

			<Header />
      <Flex justifyContent='center' alignItems='center' flexDirection='column' mt={8}>
        <Networks Network={network} selectNetwork={setNetwork} />

				<Inputs
					addressChanged={handleAddressChange}
					contract={contract}
					id={id}
					setId={setId}
					getMetadata={getMetadata}
					loading={loading}
          copyURI={copyURI}
          metadata={metadata}
				/>

			</Flex>

			<main className={styles.main}>
				<Flex minW={'80%'} justifyContent={'center'} alignItems='center' >
					<Box mx='6'>
						<Image src={img} alt='NFT' width={300} height={300} />
					</Box>

          <Box>
            <Box border={'2px'} borderColor={'black'} borderRadius={'5px'}>
              <textarea
                placeholder='Metadata will appear here. Default contract address is published on Kovan and Fuji. Use ID 0/1'
								size={'lg'}
                cols={'50'}
                rows={'10'}
                fontSize={'18px'}
                readOnly={true}
                font={'monospace'}
								value={ metadata ? JSON.stringify(metadata, null, 2) : ''}
							></textarea>
						</Box>
						{/* <pre>
              <code>
                {`
                  ${metadata ? JSON.stringify(metadata, null, 2) : 'Metadata will appear here'}
                  `}
              </code>
            </pre> */}
					</Box>
				</Flex>

        <Flex justifyContent='center' alignItems='center' flexDirection='column' maxW={'80vw'} mt={8}>

          {response && 
            <Box maxWidth={'80vw'}>
              <Box w='90vw'>
                <Heading as='h3' size='lg' mb={2}>
                  Raw response
                </Heading>
              </Box>
              <pre>
                <code className="json">
                  {`
                  ${JSON.stringify(response, null, 2)}
                  `}
								</code>
							</pre>
						</Box>
          }
				</Flex>
			</main>

      <footer className={styles.footer}>
        <a
          href="https://twitter.com/almostEfficient/"
          target="_blank"
          rel="noopener noreferrer"
        >
          @AlmostEfficient
        </a>
      </footer>
    </div>
	);
}
