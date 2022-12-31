import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import TedaviUgulaModal from "../components/TedaviUygulaModal";
import Button from "@mui/material/Button";

const HastaDetay = (props) => {
  const { hastaId } = useParams();
  const [hasta, setHasta] = useState(null);
  const [hastaIslemleri, setHastaIslemleri] = useState([]);
  const [openTedaviModal, setOpenTedaviModal] = useState(false);
  const [secilenIslem, setSecilenIslem] = useState(null);
  const [didUpdate, setDidUpdate] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3004/hastalar/${hastaId}`)
      .then((resHasta) => {
        console.log(resHasta.data);
        setHasta(resHasta.data);
        axios
          .get("http://localhost:3004/islemler")
          .then((resIslem) => {
            console.log(resIslem.data);
            const tempHastaIslemleri = [];
            for (let i = 0; i < resHasta.data.islemIds.length; i++) {
              const islem = resIslem.data.find(
                (item) => item.id === resHasta.data.islemIds[i]
              );
              tempHastaIslemleri.push(islem);
            }
            console.log(tempHastaIslemleri);
            setHastaIslemleri(tempHastaIslemleri);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, [didUpdate]);

  return (
    <div>
      <Header />
      <div
        style={{
          margin: "auto",
          minHeight: "400px",
          width: "800px",
          backgroundColor: "#20B2AA",
          color: "white",
          // textAlign: "center",
          borderRadius: "15px",
        }}
      >
        <div
          style={{
            marginLeft: "50px",
            marginRight: "50px",
          }}
        >
          <h1>Hasta Adı : {hasta?.name}</h1>
          <h1>Hasta Soyadı : {hasta?.surname}</h1>
          <h1> Hasta Telefon Numarası :{hasta?.phone}</h1>
          {hastaIslemleri.length === 0 ? (
            <p>Hastaya ait işlem bulunmamaktadır.</p>
          ) : (
            <div>
              {hastaIslemleri.map((islem) => (
                <div>
                  <p> Hastanın Şikayeti :{islem?.sikayet}</p>
                  <p>
                    {islem.uygulananTedavi === "" ? (
                      <>
                        <span>Hastaya bir tedavi uygulanmamış.</span>
                        <Button
                          style={{
                            marginLeft: "30px",
                            backgroundColor: "#1919FF",
                            border: "none",
                            width: "150px",
                            height: "30px",
                            borderRadius: "5px",
                            color: "white",
                            fontSize: "14px",
                          }}
                          onClick={() => {
                            setOpenTedaviModal(true);
                            setSecilenIslem(islem);
                          }}
                        >
                          Tedavi Uygula
                        </Button>
                      </>
                    ) : (
                      <span>Uygulanan Tedavi :{islem.uygulananTedavi}</span>
                    )}
                  </p>
                  <p>
                    {islem.yazilanIlaclar.length === 0 ? (
                      <span>Hastaya ilaç yazılmamıştır.</span>
                    ) : (
                      <p>
                        Yazilan İlaclar :
                        {islem.yazilanIlaclar.map((ilac) => (
                          <span>{ilac}</span>
                        ))}
                      </p>
                    )}
                    {/* stringler boş mu dolu */}
                    {/* , dizilerde uzunluk  */}
                  </p>
                  <hr />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <TedaviUgulaModal
        open={openTedaviModal}
        handleClose={() => setOpenTedaviModal(false)}
        islem={secilenIslem}
        didUpdate={didUpdate}
        setDidUpdate={setDidUpdate}
      />
    </div>
  );
};

export default HastaDetay;
