import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useStore } from "../../components/storeContext";
import styles from "../../styles/product.module.css";
import { Err, Loading } from "../loadingAndErr";
const List = ({ item, cat }) => {
  const router = useRouter();
  const dataWrapper = useRef();
  // console.log(item);
  return (
    <div className={styles["data-wrapper"]} ref={dataWrapper}>
      <Button
        style={{ position: "sticky", top: "40%", left: "0", zIndex:'1'}}
        shape="circle"
        onClick={() => (dataWrapper.current.scrollLeft -= 350)}
      >
        <LeftOutlined />
      </Button>
      {item.products.map((e) => {
        return (
          <Card
            className={styles["ant-card"]}
            onClick={() => router.push(`/catalog/${cat}/${e.id}`)}
            hoverable
            key={e.id}
            style={{ height: "350px", minWidth: "250px" }}
            bordered={false}
            cover={
              <Image
                style={{
                  backgroundImage: "url(/loading.gif)",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "70px",
                }}
                src={e.images[0]}
                alt={e.name}
                width={250}
                height={280}
                loading="lazy"
                title={e.name}
              />
            }
          >
            <Card.Meta
              className={styles["ant-card-meta"]}
              title={`Rp.${e.price
                .toString()
                .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}`}
              description={e.name}
            />
          </Card>
        );
      })}
      <Button
        style={{ position: "sticky", top: "40%", right: "0" }}
        shape="circle"
        onClick={() => (dataWrapper.current.scrollLeft += 350)}
      >
        <RightOutlined />
      </Button>
    </div>
  );
};

const Products = () => {
  const store = useStore();
  useEffect(() => {
    store.loadData();
  }, [store]);

  if (store.status === "pending") {
    return <Loading />;
  }
  //if no data
  if (!store.allData && store.status === "error") {
    return <Err />;
  }
  return (
    <>
      {store.filteredData.map((e) => {
        return (
          <section className={styles.container} key={e.id}>
            <div className={styles.header}>
              <h1>{e.category_name}</h1>
            </div>
            <List item={e} cat={e.category_name} />
          </section>
        );
      })}
    </>
  );
};
export default observer(Products);
