import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import { Item } from "./App";

type AddItemProps = {
  addItem: (item: Item) => void;
}

function AddItem(props: AddItemProps) {
  const [ open, setOpen ] = useState(false);
  const [ item, setItem ] = useState<Item>({
    product: '',
    amount: '',
  });

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  // App.tsx의 addItem 함수를 호출하고, item 상태를 전달
  const addItem = () => {
    props.addItem(item);
    // TextField에 있는 내용을 다 지우고 Modal을 닫음
    setItem({product: '', amount: ''});
    handleClose();
  }

  return(
    <>
      <Button onClick={handleOpen} variant="outlined">
        Add Item
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Item</DialogTitle>
        <DialogContent>
          <TextField value={item.product} margin="dense"
            onChange={e => setItem({...item, product: e.target.value})}
            label="Product/제품명" fullWidth />
          <TextField value={item.amount} margin="dense"
            onChange={e => setItem({...item, amount: e.target.value})}
            label="Amount/수량" fullWidth
          />
        </DialogContent>
        <Button onClick={handleClose}>
          Cancel / 취소
        </Button>
        <Button onClick={addItem}>
          Add / 저장
        </Button>
      </Dialog>
    </>
  );
}

export default AddItem