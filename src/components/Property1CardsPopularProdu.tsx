import { FunctionComponent } from "react";
import Product from "./Product";
import styles from "./Property1CardsPopularProdu.module.css";

export type Property1CardsPopularProduType = {
  className?: string;
};

const Property1CardsPopularProdu: FunctionComponent<
  Property1CardsPopularProduType
> = ({ className = "" }) => {
  return (
    <main className={[styles.property1cardsPopularProdu, className].join(" ")}>
      <h1 className={styles.heading}>Accesorios populares</h1>
      <div className={styles.productsGriid}>
        <Product nathanDumlaoKixfBEdypUnsplash="/nathandumlaokixfbedyp64unsplash@2x.png" />
        <Product
          nathanDumlaoKixfBEdypUnsplash="/nathandumlaokixfbedyp64unsplash@2x.png"
          emptyInfoHeight="unset"
          emptyInfoDisplay="unset"
        />
        <Product
          nathanDumlaoKixfBEdypUnsplash="/nathandumlaokixfbedyp64unsplash@2x.png"
          emptyInfoHeight="unset"
          emptyInfoDisplay="unset"
        />
      </div>
    </main>
  );
};

export default Property1CardsPopularProdu;
