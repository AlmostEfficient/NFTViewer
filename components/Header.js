// Import Chakra-ui components for a plain header with no buttons
import { Box, Button, color, useColorMode } from '@chakra-ui/react'

export default function Header() {
  const { toggleColorMode } = useColorMode();
  return (
    <>
      <header>
        <Box d="flex" alignItems={'center'} bg='#303b52' w='100%' h='20' justifyContent={'space-between'}>
          <Box fontSize={'4xl'} fontWeight={'bold'} ml={10} color={'#fff'}>
            A better NFT Viewer for EVM testnets
          </Box>
          <Button onClick={toggleColorMode}>Toggle Dark mode</Button>
          <Box textColor={'white'} mr='20'>
            Powered by
            <a
              href="https://www.buildspace.so"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div> <strong> 🦄 Buildspace </strong> </div>
            </a>
          </Box>
        </Box>
      </header>
    </>
  );
}