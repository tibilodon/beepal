import styles from "@/styles/tnc.module.scss";

const TnC = () => {
  return (
    <div className={styles.wrap}>
      <h1>Szigorúan kötelező sütik</h1>
      <p>
        Ezek a sütik biztosítják a honlap megfelelő működését, megkönnyítik azok
        használatát, nélkülük a honlap kényelmes használata nehezebben vagy
        egyáltalán nem biztosítható. Ezek a sütik a látogatók azonosítása nélkül
        gyűjtenek információkat a honlapok használatáról. Vannak köztük olyanok,
        amelyek törlődnek amint a látogató bezárja a böngészőt (munkamenet
        sütik), míg másokat a látogató készüléke, illetve a böngészője mindaddig
        ment, amíg azok mentési időtartama le nem jár, vagy a látogató azokat
        nem törli (állandó sütik). A sütik a felhasználó eszközein a honlapok
        böngészése során automatikusan elhelyezésre kerülnek. Azokat a böngésző
        beállításoknál utólag és önállóan lehetséges törölni.
      </p>
    </div>
  );
};

export default TnC;
