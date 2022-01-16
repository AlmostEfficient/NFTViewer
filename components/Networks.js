import { Box, Stack, Radio, RadioGroup } from '@chakra-ui/react'

export default function Networks({ Network, selectNetwork }) {
  const handleChange = (e) => {
    selectNetwork(e)
    console.log("Network set to: " + e)
  }

  return (
    <Box>
      <RadioGroup size='lg' onChange={handleChange} value={Network} defaultValue="Kovan">
        <Stack direction='row'>
          <Radio value="kovan">Ethereum Kovan</Radio>
          <Radio value="fuji">Avalanche Fuji</Radio>
          <Radio value="mumbai">Matic Mumbai</Radio>
          <Radio value="bsc">BSC Testnet</Radio>
          <Radio value="arbitrum">Arbitrum Testnet</Radio>
          <Radio value="fantom">Fantom Testnet</Radio>
        </Stack>
      </RadioGroup>
    </Box>
  );
}