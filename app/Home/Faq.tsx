"use client";

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Flex,
  useColorModeValue,
  Text,
  Container,
} from "@chakra-ui/react";
import { faQuestionCircle, faMoneyBill, faLocationArrow, faCog, faPhone} from "@fortawesome/free-solid-svg-icons";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SimpleAccordion() {
  return (
    <Flex
      minH={"50vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("black.90", "black.800")}
      style={{
        backgroundColor: "green",
        marginTop: "2px",
      }}
    >
      <Container>
 <p className=" mb-10  text-4xl text-green-300 text-center">
 <FontAwesomeIcon icon={faQuestionCircle}/>  Frequently Asked Questions
        </p>
        <Accordion allowMultiple width="100%" maxW="lg" rounded="lg">
          <AccordionItem>
            <AccordionButton
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              p={4}
            >
              <Text fontSize="md" color="white" className="text-center mt-3">
              <FontAwesomeIcon icon={faMoneyBill} style={{ }}/> How do you pay at Liwonde Private Hospital?
              </Text>
              <ChevronDownIcon fontSize="24px" />
            </AccordionButton>
            <AccordionPanel pb={4} className="bg-yellow">
              <Text color="yellow" className="text-center">
                liwonde private hospital offers wide range <br />
                of payment methods including cash, digital <br />
                payments such as Mpamba, Airtel Money, <br /> Banks and
                organisation
              </Text>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              p={4}
            >
              <Text fontSize="md" color="white">
              <FontAwesomeIcon icon={faLocationArrow}/>Where is Liwonde Private Hospital located?
              </Text>
              <ChevronDownIcon fontSize="24px" />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Text color="yellow" className="text-center">
                follow the map in the quick service section
                <br />
                to get the precise location of the liwonde Private Hospital
              </Text>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              p={4}
            >
              <Text fontSize="md" color="white">
              <FontAwesomeIcon icon={faCog}/> Where to access services of Liwonde Private Hospital?
              </Text>
              <ChevronDownIcon fontSize="24px" />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Text color="yellow" className="text-center">
                You can access services of the Liwonde Private Hospital <br />
                 by directly visiting us in Liwonde township <br />
                and you can  book an  appointment <br />
                via the links provided throughout the website
              </Text>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              p={4}
            >
              <Text fontSize="md" color="white">
              <FontAwesomeIcon icon={faPhone}/> Any other Question?, Please Contact us
              </Text>
              <ChevronDownIcon fontSize="24px" />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Text color="yellow" className="text-center" >
                
                0888597087 <br/>
                0999940863 
              </Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Container>
    </Flex>
  );
}
