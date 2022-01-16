import { Input, Flex, Box, Button, HStack, useNumberInput} from '@chakra-ui/react';

export default function InputBox({ id, setId, contract, addressChanged, loading, getMetadata, metadata, copyURI }) {
  
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
		<>
			<Flex mt={6} flexDirection={'row'} alignItems="center">
				<Input
					size="lg"
					w={80}
					placeholder="Paste contract address"
					onChange={addressChanged}
					value={contract}
				/>

				<Box mx={5}>
					<HookUsage />
				</Box>

				<Box>
					<Button
						size="lg"
						disabled={loading}
						onClick={() => getMetadata()}
					>
						Fetch
					</Button>

					<Button
						size="lg"
						ml="4"
						disabled={!metadata}
						onClick={() => copyURI()}
					>
						Copy URI
					</Button>
				</Box>
			</Flex>
		</>
	);
}
