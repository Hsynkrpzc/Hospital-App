import React from "react";
// import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  // const [randevular, setRandevular] = useState(null);
  // const [hastalar, setHastalar] = useState(null);
  const navigate = useNavigate();
  const { randevularState, hastalarState } = useSelector((state) => state);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3004/randevular")
  //     .then((resRandevular) => {
  //       setRandevular(resRandevular.data);
  //       axios
  //         .get("http://localhost:3004/hastalar")
  //         .then((resHastalar) => {
  //           setHastalar(resHastalar.data);
  //         })
  //         .catch((err) => console.log("hastalar çekme hatası", err));
  //     })
  //     .catch((err) => console.log("randevular çekme hatası", err));
  // }, []);

  // if (randevular === null || hastalar === null) {
  //   return <h1>Loading</h1>;
  // }
  if (
    hastalarState.start === true ||
    hastalarState.fail === true ||
    randevularState.start === true ||
    randevularState.fail === true
  ) {
    return <h1>Loading</h1>;
  }

  return (
    <div>
      <Header />
      <TableContainer style={{ marginTop: "50px" }} component={Paper}>
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button onClick={() => navigate("/randevu-ekle")} variant="contained">
            Randevu Ekle
          </Button>
        </div>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "#aaa" }}>
            <TableRow>
              <TableCell>Tarih</TableCell>
              <TableCell>Adı </TableCell>
              <TableCell>Soyadı</TableCell>
              <TableCell>Telefon Numarası </TableCell>
              <TableCell>İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {randevularState.randevular.map((randevu) => {
              const aradigimHasta = hastalarState.hastalar.find(
                (hasta) => hasta.id === randevu.hastaId
              );
              return (
                <TableRow
                  key={randevu.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {new Date(randevu.date).toLocaleString()}
                  </TableCell>
                  <TableCell>{aradigimHasta.name}</TableCell>
                  <TableCell>{aradigimHasta.surname} </TableCell>
                  <TableCell>{aradigimHasta.phone} </TableCell>
                  <TableCell>İşlemler butonları gelecek </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Home;
