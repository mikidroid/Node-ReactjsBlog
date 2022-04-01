import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button
} from '@chakra-ui/react'
import * as CI from '@chakra-ui/icons'
import * as CU from '@chakra-ui/react'
import * as RR from "react-router-dom"

export default function App(props){
 return(

<Menu>

  <CU.HStack p={2}>
  <MenuButton px={2} color='#efefef'>
    <CI.DragHandleIcon mb={1} boxSize={5}/>
  </MenuButton>
   <CU.Text fontWeight='bold' bgClip='text' bgGradient='linear(to-l,#fff,#fff)' sx={{ mt:5}} textAlign='right' fontSize='xl'>
   
   {props.title ? props.title : 'News Flash Blog'}
   
   </CU.Text>
  </CU.HStack>
  <MenuList>
    <MenuGroup title='Links'>
     <RR.Link to="/"> <MenuItem >Home</MenuItem></RR.Link>
     <RR.Link to="/post/add-post"> <MenuItem >Add Post</MenuItem></RR.Link>
    </MenuGroup>
    <MenuDivider />
    <MenuGroup title='Help'>
      <MenuItem>Docs</MenuItem>
      <MenuItem>FAQ</MenuItem>
    </MenuGroup>
    <MenuDivider/>
    <MenuGroup title="socials">
     <MenuItem>
      Facebook
     </MenuItem>
      <MenuItem>
      Instagram
     </MenuItem>
    </MenuGroup>
  </MenuList>
</Menu>)
}