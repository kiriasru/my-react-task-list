import {
  ChakraProvider,
  Flex,
  IconButton,
  useColorMode,
  Heading,
} from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <header className="header">
      <ChakraProvider>
        <Flex alignItems="center" justifyContent="space-between">
          <Heading as="h1" size="lg">
            Todo App
          </Heading>
          <IconButton
            aria-label="Toggle color mode"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
          />
        </Flex>
      </ChakraProvider>
    </header>
  );
};

export default Header;
