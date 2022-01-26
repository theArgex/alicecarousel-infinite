import "./styles.css";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import axios from "axios";
import { useEffect, useState } from "react";

export default function App() {
  const [galleryItems, setItems] = useState([]);

  useEffect(() => {
    // Axios would be a nice lib to try in nu 🤔
    axios
      .get(`https://picsum.photos/v2/list?page=2&limit=10`, {})
      .then((res) => {
        const data = res.data;
        const img = data.map((m: { download_url: string | undefined }) => (
          <img src={m.download_url} alt="" />
        ));
        setItems(img);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Responsive functionality. Maybe useful?
  const responsive = {
    0: { items: 1 },
    500: { items: 4 },
    1024: { items: 6 }
  };

  return (
    <div className="App">
      <AliceCarousel
        items={galleryItems}
        responsive={responsive}
        controlsStrategy="responsive"
        autoPlayInterval={450}
        autoPlayDirection="ltr"
        autoPlay
        infinite // <- Here's what you need
        mouseTracking
      />
    </div>
  );
}
