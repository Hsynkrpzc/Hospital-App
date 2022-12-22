import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HastaEkle = (props) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [sikayet, setSikayet] = useState("");
  const [hastalar, setHastalar] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3004/hastalar")
      .then((res) => {
        setHastalar(res.data);
      })
      .catch((err) => console.log("HastaEkle S. GetHastalar Hatası", err));
  }, []);

  if (hastalar === null) {
    <h1>Loading....</h1>;
  }
  const handleSubmit = (event) => {
    event.preventDefault();

    if (name === "" || surname === "" || phone === "" || sikayet === "") {
      alert("Tüm alanların doldurulması zorunludur!");
      return;
    }

    if (phone.length !== 11) {
      alert("Telefon numarası 11 haneli olmalıdır!");
      return;
    }

    const hasNumber = hastalar.find((hasta) => hasta.phone === phone);

    if (hasNumber !== undefined) {
      alert("Bu numarayla kayıtlı bir hasta bulunmaktadır!");
      return;
    }

    const newIslem = {
      id: String(new Date().getTime() + 1),
      sikayet: sikayet,
      uygulananTedavi: "",
      yazilanIlaclar: [],
    };
    axios
      .post("http://localhost:3004/islemler", newIslem)
      .then((islemRes) => {
        const newHasta = {
          id: String(new Date().getTime()),
          name: name,
          surname: surname,
          phone: phone,
          islemIds: [newIslem.id],
        };
        axios
          .post("http://localhost:3004/hastalar", newHasta)
          .then((res) => {
            navigate("/hastalar");
          })
          .catch((err) => console.log("HastaEkleSafası newhastaPost ERR", err));
      })
      .catch((err) => console.log("hastaEkle İşlemPost err", err));
  };

  return (
    <div>
      <Header />
      <form style={{ margin: "50px" }} onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0px",
          }}
        > 
          <TextField
            style={{ width: "50%" }}
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
            style={{ width: "50%" }}
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
            style={{ width: "50%" }}
            type={"number"}
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
          }}
        >
          <TextField
            style={{ width: "50%" }}
            id="outlined-basic"
            label="Hastanın Şikayeti"
            variant="outlined"
            value={sikayet}
            onChange={(event) => setSikayet(event.target.value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0px",
          }}
        >
          <Button type="submit" variant="contained">
            Kaydet
          </Button>
        </div>
      </form>
    </div>
  );
};

export default HastaEkle;
