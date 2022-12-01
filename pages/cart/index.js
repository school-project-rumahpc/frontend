import { Col, Layout, Row, Button } from "antd";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import Link from "next/link";
import { Custom } from "../../utils/custom";
import styles from "../../styles/product.module.css";
import { useEffect } from "react";
import { Err, Loading } from "../../components/loadingAndErr";
import { useStore } from "../../components/storeContext";
const { Header, Content } = Layout;

const OrderDisplay = ({cartStore})=>{
  return(
    <Row>
    </Row>)
}

const CartDisplay = ({ cartStore }) => {
  const { userCart } = cartStore;
  return userCart.map((cartItem) => {
    const { item, id, subTotal } = cartItem;
    console.log({ cartItem, cartStore });
    return (
      <Row
        align="middle"
        key={id}
        style={{
          padding: "0 25px",
          borderBottom: "2px solid grey",
          height: "200px",
          gap: "25px",
        }}
      >
        <Col
          className={styles.cart}
          style={{
            height: "170px",
            width: "155px",
            borderRadius: "25px",
          }}
        >
          <Image
            style={{ ...Custom.loadingGif, borderRadius: "25px" }}
            alt={item.name}
            src={item.images[0]}
            layout="fill"
            loading="lazy"
          />
        </Col>
        <Col>
          <Row>
            <h1 style={{ color: "black" }}>
              {`Rp.${item.price
                .toString()
                .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}`}
            </h1>
          </Row>
          <Row>
          <p style={{ color: "black" }}>
          Subtotal :&nbsp;
              {`Rp.${subTotal
                .toString()
                .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}`}
            </p>
          </Row>
          <Row>
            <h3>{item.name}</h3>
          </Row>
          <Row gutter={[20]} align="middle">
            <Col>
              <Button
                disabled={cartStore.status === "pending" ? true : false}
                onClick={() =>
                  cartStore.removeFromCart({ product_id: item.id })
                }
                size="regular"
              >
                -
              </Button>
            </Col>
            <Col>
              <h2>{cartItem.quantity}</h2>
            </Col>
            <Col>
              <Button
                disabled={cartStore.status === "pending" ? true : false}
                onClick={() => cartStore.addToCart({ product_id: item.id })}
                size="regular"
              >
                +
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  });
};

const Cart = () => {
  const { cartStore } = useStore();
  const colStyle = {
    minWidth: "600px",
    width: "40vw",
    maxHeight: "100%",
    backgroundColor: "#fff",
  };
  useEffect(() => {
    cartStore.loadCart();
  }, []);

  if (cartStore.status === "error") return <Err />;

  return (
    <Row
      align="middle"
      justify="center"
      style={{ gap: "50px", height: "100%", backgroundColor: "#009867" }}
    >
      <Col style={{ ...colStyle, height: "100vh" }}>
        <Layout>
          <Header
            style={{ borderBottom: "3px solid #009867", height: "100px" }}
          >
            <Row
              align="middle"
              justify="space-between"
              style={{ height: "100px", padding: "0 20px" }}
            >
              <Col>
                <Link href={"/catalog"}>
                  <a>
                    <Image
                      src={"/logo.svg"}
                      width={121}
                      height={84}
                      alt="Logo"
                      priority
                    />
                  </a>
                </Link>
              </Col>
              <Col>
                <h1>Cart</h1>
              </Col>
            </Row>
          </Header>
          <Content style={{ height: "calc(100vh - 100px)" }}>
            {cartStore.userCart ? (
              <CartDisplay cartStore={cartStore} />
            ) : (
              <Loading />
            )}
          </Content>
        </Layout>
      </Col>
      <Col
        style={{
          ...colStyle,
          borderRadius: "25px",
          margin: "100px 0",
        }}
      >
      <OrderDisplay cartStore={cartStore}/>
      </Col>
    </Row>
  );
};

export default observer(Cart);
