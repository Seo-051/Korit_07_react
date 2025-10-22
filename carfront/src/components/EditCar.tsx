// EditCar.tsx
import { ChangeEvent, useState } from "react";
import { Car, CarResponse, CarEntity } from "../types";
import { Dialog, DialogActions, DialogTitle } from "@mui/material";
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

  // AddCar.tsx에서 그대로 복사해왔습니다.
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCar({...car, [event.target.name]: event.target.value});
  }

  return(
    <>
      <button onClick={handleClickOpen}>
        Edit
      </button>
      <Dialog open={open} onClose={handleClickClose}>
        <DialogTitle>Edit Car</DialogTitle>
        <CarDialogContent car={car} handleChange={handleChange} />
        <DialogActions>
          <button onClick={handleClickClose}>Cancel | 취소</button>
          <button onClick={handleSave}>Save | 저장</button>
        </DialogActions>  
      </Dialog>  
    </>
  );
}

export default EditCar