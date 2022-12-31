import React, { useState, useEffect } from "react";
import { Modal, Button, TextField, Box } from "@mui/material";
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

const TedaviUgulaModal = (props) => {
  const { handleClose, open, islem, didUpdate, setDidUpdate } = props;
  const [uygulananTedavi, setUygulananTedavi] = useState("");
  const [ilaclar, setIlaclar] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (uygulananTedavi === "") {
      alert("Tedavi alanı boş bırakılamaz");
      return;
    }
    if (ilaclar === "") {
      alert("İlaç yazmadınız");
    }
    // ilaçlar boş bırakılabilir yaptım. return yok

    const seperatedIlaclar = ilaclar.split(",");
    console.log(seperatedIlaclar);

    const updatedIslem = {
      ...islem,
      uygulananTedavi: uygulananTedavi,
      yazilanIlaclar: seperatedIlaclar,
    };

    console.log(updatedIslem);

    axios.put(`  http://localhost:3004/islemler/${islem.id}`, updatedIslem)
      .then((res) => {
        setUygulananTedavi("");
        setIlaclar("");
        handleClose();
        setDidUpdate(!didUpdate);
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
          <h1 style={{ textAlign: "center" }}>Tedavi Ekle</h1>
          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                margin: "20px 0px",
              }}
            >
              <TextField
                style={{ width: "100%" }}
                id="outlined-basic"
                label="Uygulanan Tedavi"
                variant="outlined"
                value={uygulananTedavi}
                onChange={(event) => setUygulananTedavi(event.target.value)}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                margin: "20px 0px",
              }}
            >
              <TextField
                style={{ width: "100%" }}
                id="outlined-basic"
                label="Yazılan İlaç"
                variant="outlined"
                value={ilaclar}
                onChange={(event) => setIlaclar(event.target.value)}
              />
              <p>
                <small style={{ color: "orangered" }}>
                  *İlaçlar arasında mutlaka virgül (,) koyunuz
                </small>
              </p>
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

export default TedaviUgulaModal;
