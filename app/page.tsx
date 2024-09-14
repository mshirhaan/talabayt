// src/app/page.tsx

'use client'

import { useAuth } from '@/contexts/AuthContext'
import { 
  Box, 
  Container, 
  Heading, 
  SimpleGrid, 
  Text, 
  VStack, 
  Button, 
  Icon,
  useColorModeValue
} from '@chakra-ui/react'
import { FaTools, FaClipboardList, FaHistory, FaUserCog } from 'react-icons/fa'
import NextLink from 'next/link'
import { IconType } from 'react-icons'

interface FeatureProps {
  title: string
  text: string
  icon: IconType
  href: string
}

const Feature = ({ title, text, icon, href }: FeatureProps) => {
  return (
    <VStack
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'2xl'}
      rounded={'md'}
      overflow={'hidden'}
      p={6}
      textAlign={'center'}
      align={'center'}
      spacing={4}
    >
      <Icon as={icon} w={10} h={10} color="#ff9202" />
      <Heading fontSize={'2xl'}>{title}</Heading>
      <Text color={'gray.500'}>{text}</Text>
      <Button
        as={NextLink}
        href={href}
        mt={2}
        fontSize={'sm'}
        rounded={'full'}
        bg={'#002f6d'}
        color={'white'}
        _hover={{
          bg: '#001f4d',
        }}
        _focus={{
          bg: '#001f4d',
        }}
      >
        Go to {title}
      </Button>
    </VStack>
  )
}

export default function Home() {
  const { user } = useAuth()

  return (
    <Box>
      <Container maxW={'5xl'} py={12}>
        <VStack spacing={2} textAlign="center" mb={12}>
          <Heading
            as="h1"
            fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
            fontWeight="bold"
            color={'#002f6d'}
            mb={4}
          >
            Welcome to House Maintenance App
          </Heading>
          <Text color={'gray.500'} fontSize={'lg'}>
            Your one-stop solution for all your home maintenance needs
          </Text>
        </VStack>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Feature
            icon={FaTools}
            title={'New Request'}
            text={'Submit a new maintenance request for your home'}
            href={'/request'}
          />
          <Feature
            icon={FaClipboardList}
            title={'My Requests'}
            text={'View and manage your existing maintenance requests'}
            href={'/my-requests'}
          />
          <Feature
            icon={FaHistory}
            title={'Request History'}
            text={'Access the history of your past maintenance requests'}
            href={'/history'}
          />
          <Feature
            icon={FaUserCog}
            title={'Profile Settings'}
            text={'Manage your account settings and preferences'}
            href={'/profile'}
          />
        </SimpleGrid>
      </Container>
    </Box>
  )
}