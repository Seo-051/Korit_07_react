// EditCar.tsx
import { ChangeEvent, useState, KeyboardEvent } from "react";
import { Car, CarResponse, CarEntity } from "../types";
import { Dialog, DialogActions, DialogTitle, Button } from "@mui/material";
import CarDialogContent from "./CarDialogContent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCar } from "../api/carapi";

type FormProps = {
  cardata: CarResponse
}

function EditCar({cardata}: FormProps) {
  const queryClient = useQueryClient();
  const [ open, setOpen ] = useState(false);
  const [ car, setCar ] = useState<Car>({
    brand: '',
    model: '',
    color: '',
    registrationNumber: '',
    modelYear: 0,
    price: 0
  });

  const { mutate } = useMutation(updateCar, {
    onSuccess: () => {
      queryClient.invalidateQueries(["cars"]);
    },
    onError: err => {
      console.log(err);
    }
  });

  const handleClickOpen = () => {
    // Modal이 열렸을 때 특정 id 값에 맞는 정보를 불러오면 좋겠다. 그래서 AddCar에서의 handleClickOpen()과 코드라인의 차이가 생깁니다.
    setCar({
      brand: cardata.brand,
      model: cardata.model,
      color: cardata.color,
      registrationNumber: cardata.registrationNumber,
      modelYear: cardata.modelYear,
      price: cardata.price
    });
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  }

  const handleSave = () => {
    const url = cardata._links.self.href;
    const carEntity: CarEntity = { car, url };
    mutate(carEntity);
    setCar({
      brand: '',
      model: '',
      color: '',
      registrationNumber: '',
      modelYear: 0,
      price: 0
    });
    setOpen(false);
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    // 'Enter' 키를 눌렀을 때만 실행
    if (event.key === 'Enter') {
      // Enter 키를 눌렀을 때 실행할 동작 정의
      event.preventDefault();
      handleSave();
      // 입력 필드를 초기화하려면 아래 주석을 해제하세요.
      // setInputValue('');
    }
  };

  // AddCar.tsx에서 그대로 복사해왔습니다.
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCar({...car, [event.target.name]: event.target.value});
  }

  return(
    <>
      <Button onClick={handleClickOpen}>
        EDIT
      </Button>
      <Dialog open={open} onClose={handleClickClose}>
        <DialogTitle>Edit Car</DialogTitle>
        <div onKeyDown={handleKeyDown}>
          <CarDialogContent car={car} handleChange={handleChange} />
        </div>
        <DialogActions>
          <Button onClick={handleClickClose}>Cancel | 취소</Button>
          <Button onClick={handleSave}>Save | 저장</Button>
        </DialogActions>  
      </Dialog>  
    </>
  );
}

export default EditCar