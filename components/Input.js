import { Input } from '@chakra-ui/react'

export default function InputBox({placeholder, onChange, value}) {
  return (
    <>
      <Input placeholder={placeholder || 'Enter address'} />
    </>
  );
}