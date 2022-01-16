// Import Chakra-ui components for a plain header with no buttons
import { Box } from '@chakra-ui/react'

export default function Header() {
  return (
    <>
      <header>
        <Box d="flex" alignItems={'center'} bg='#303b52' w='100%' h='20' justifyContent={'space-between'}>
          <Box fontSize={'4xl'} fontWeight={'bold'} ml={10} color={'#fff'}>
            A better NFT Viewer for EVM testnets
          </Box>
        </Box>
      </header>
    </>
  );
}