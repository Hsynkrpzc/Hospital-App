import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import { Button, TextField, Box } from "@mui/material";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50vw",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const EditHastaModal = (props) => {
  const {
    handleClose,
    open,
    hasta,
    hastalar,
    updateComponent,
    setUpdateComponent,
  } = props;
  const [name, setName] = useState(hasta?.name);
  const [surname, setSurname] = useState(hasta?.surname);
  const [phone, setPhone] = useState(hasta?.phone);

  useEffect(() => {
    setName(hasta?.name);
    setSurname(hasta?.surname);
    setPhone(hasta?.phone);
  }, [hasta]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (name === "" || surname === "" || phone === "") {
      alert("Tüm alanların doldurulması zorunludur!");
      return;
    }

    if (phone.length !== 11) {
      alert("Telefon numarası 11 haneli olmalıdır!");
      return;
    }
    const filteredHastalar = hastalar.filter(
      (item) => item.phone !== hasta.phone
    );
    const hasNumber = filteredHastalar.find((hasta) => hasta.phone === phone);

    if (hasNumber !== undefined) {
      alert("Bu numarayla kayıtlı bir hasta bulunmaktadır!");
      return;
    }
    const updatedHasta = {
      ...hasta,
      name: name,
      surname: surname,
      phone: phone,
    };
    axios
      .put(`http://localhost:3004/hastalar/${hasta.id}`, updatedHasta)
      .then((response) => {
        handleClose();
        setUpdateComponent(!updateComponent);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 style={{ textAlign: "center" }}>Hasta Düzenle</h1>
          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "20px 0px",
              }}
            >
              <TextField
                style={{ width: "100%" }}
                id="outlined-basic"
                label="Hasta Adı"
                variant="outlined"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "20px 0px",
              }}
            >
              <TextField
                style={{ width: "100%" }}
                id="outlined-basic"
                label="Hasta Soyadı"
                variant="outlined"
                value={surname}
                onChange={(event) => setSurname(event.target.value)}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "20px 0px",
              }}
            >
              <TextField
                style={{ width: "100%" }}
                id="outlined-basic"
                label="Telefon Numarası"
                variant="outlined"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "20px 0px",
                gap: "20px",
              }}
            >
              <Button onClick={handleClose} variant="outlined" color="error">
                VAZGEÇ
              </Button>
              <Button type="submit" variant="contained">
                KAYDET
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default EditHastaModal;