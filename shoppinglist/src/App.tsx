import { Container } from '@mui/material'
import {AppBar, Toolbar, Typography} from '@mui/material'
import {List, ListItem, ListItemText } from '@mui/material';
import './App.css'
import { useEffect, useState } from 'react';
import AddItem from './AddItem';
import { getItems } from './api/itemapi';

export type Item = {
  product: string;
  amount: string;
}

function App() {
  const [ items, setItems ] = useState<Item[]>([]);
  const addItem = (item:Item) => {
    setItems([item, ...items]);
  }

useEffect(() => {
  const fetchData = async () => {
    try {
      const items = await getItems();  
      console.log("서버에서 받은 데이터:", items);
      setItems(items);                 
    } catch (error) {
      console.error("아이템을 불러오는데 실패했습니다:", error);
    }
  };

  fetchData();
}, []);



  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant='h6'>
            쇼핑 리스트 Shopping List
          </Typography>
        </Toolbar>
      </AppBar>
      <AddItem addItem={addItem}/>
      <List>
        {
          items.map((item, index) =>
            <ListItem key={index} divider>
              <ListItemText 
                primary={item.product}
                secondary={item.amount}/>
            </ListItem>
          )
        }
      </List>
    </Container>
  )
}

export default App
