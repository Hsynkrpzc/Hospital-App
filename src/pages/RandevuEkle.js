import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Header from "../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RandevuEkle = (props) => {
  const [date, setDate] = useState("");
  const [phone, setPhone] = useState();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [sikayet, setSikayet] = useState("");
  const [hastalar, setHastalar] = useState(null);
  const [hasHasta, setHasHasta] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3004/hastalar")
      .then((res) => {
        setHastalar(res.data);
      })
      .catch((err) => console.log("randevuEkle Hastalar çekme Err", err));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(date);
    if (date === "" || phone === "" || name === "" || surname === "") {
      alert("Bütün bilgiler girilmelidir.");
      return;
    }

    if (phone.length !== 11) {
      alert("Telefon numarası 11 haneli olmalıdır. 0506*******");
      return;
    }
    if (hasHasta) {
      const newRandevu = {
        id: String(new Date().getTime()),
        date: date,
        hastaId: hasHasta.id,
      };
      const newIslem = {
        id: String(new Date().getTime() + 1),
        sikayet: sikayet,
        uygulananTedavi: "",
        yazilanIlaclar: [],
      };
      const updatedHasta = {
        ...hasHasta,
        islemIds: [...hasHasta.islemIds, newIslem.id],
      };
      axios
        .post("http://localhost:3004/randevular", newRandevu)
        .then((res) => {
          console.log("newRandevu res", res);
        })
        .catch((err) => console.log("newRandevu err", err));

      axios
        .post("http://localhost:3004/islemler", newIslem)
        .then((res) => {
          console.log("newIslem res", res);
        })
        .catch((err) => console.log("newIslem err,err"));

      axios
        .put(`http://localhost:3004/hastalar/${hasHasta.id}`, updatedHasta)
        .then((res) => {
          console.log("updated hasta res", res);
        })
        .catch((err) => console.log("updated hasta err,err"));
      navigate("/");
    } else {
      const newHastaIslem = {
        id: String(new Date().getTime() + 1),
        sikayet: sikayet,
        uygulananTedavi: "",
        yazilanIlaclar: [],
      };
      const newHasta = {
        id: String(new Date().getTime),
        name: name,
        surname: surname,
        phone: phone,
        islemIds: [newHastaIslem.id],
      };
      const newHastaRandevu = {
        id: String(new Date().getTime() + 2),
        date: date,
        hastaId: newHasta.id,
      };
      axios
        .post("http://localhost:3004/randevular", newHastaRandevu)
        .then((res) => {
          console.log("newHstaRandevu res", res);
        })
        .catch((err) => console.log("newHstaRandevu err", err));
      axios
        .post("http://localhost:3004/islemler", newHastaIslem)
        .then((res) => {
          console.log("newHastaIslm res", res);
        })
        .catch((err) => console.log("nnewHastaIslm err", err));
      axios
        .post("http://localhost:3004/hastalar", newHasta)
        .then((res) => {
          console.log("randevuEkle NewHasta", res);
        })
        .catch((err) => console.log("randevuEkleNewHasta", err));
      navigate("/");
    }
  };

  if (hastalar === null) {
    <h1>Loading...</h1>;
  }

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
    const arananHasta = hastalar.find(
      (item) => item.phone === String(event.target.value)
    );

    if (arananHasta !== undefined) {
      setName(arananHasta.name);
      setSurname(arananHasta.surname);
      setHasHasta(arananHasta);
    } else {
      setName("");
      setSurname("");
      setHasHasta(false);
    }
  };

  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0px",
          }}
        >
          <input
            value={date}
            defaultValue={new Date("dd/mm/yyyy hh:mm")}
            onChange={(event) => setDate(event.target.value)}
            type={"datetime-local"}
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
            onChange={handlePhoneChange}
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
            type={"text"}
            id="outlined-basic"
            label="Hasta Adı"
            variant="outlined"
            value={name}
            onChange={(event) => setName(event.target.value)}
            disabled={hasHasta}
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
            type={"text"}
            id="outlined-basic"
            label="Hasta Soyadı"
            variant="outlined"
            value={surname}
            onChange={(event) => setSurname(event.target.value)}
            disabled={hasHasta}
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
            type={"text"}
            id="outlined-basic"
            label=" Hastanın Şikayeti"
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

export default RandevuEkle;
