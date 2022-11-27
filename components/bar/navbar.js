import { Col, Input, Row, Layout } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import styles from "../../styles/header.module.css";
import UserDrawer from "../user";
const { Header } = Layout;

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  //Drawer trigger
  const showDrawer = () => {
    setOpen(true);
  };
  const drawerClose = () => {
    setOpen(false);
  };

  //TODO: search handler
  const onSearch = (value) => {
    if (value) {
      console.log(value);
      router.push(`/search?s=${value}`)
    }
  };

  return (
    <Header
      style={{
        height: "100px",
        zIndex: "1",
        boxShadow: " 0px 2px 5px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Row
        justify="space-between"
        align="middle"
        style={{
          height: "100px",
        }}
      >
        <Col className={styles.logo}>
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
        <Col style={{ margin: "auto" }}>
          <Input.Search
            style={{ width: "350px" }}
            onSearch={onSearch}
            allowClear
          />
        </Col>
        <Col>
          <div className={styles.icon}>
            <Link href={"/our-retail"}>
              <a>
                <Image src={"/store.svg"} width={35} height={35} priority />
              </a>
            </Link>
          </div>
        </Col>
        <Col>
          <div className={styles.icon}>
            <Link href={"/catalog"}>
              <a>
                <Image src={"/cart.svg"} width={35} height={35} priority />
              </a>
            </Link>
          </div>
        </Col>
        <Col>
          <div className={styles.user}>
            <div id={styles[1]}></div>
            <div id={styles[2]}></div>
            <div id={styles[3]}></div>
            <div>
              <a onClick={showDrawer}>
                <Image
                  src={"/account.svg"}
                  width={40}
                  height={40}
                  alt="Cart"
                  priority
                />
              </a>
            </div>
          </div>
        </Col>
      </Row>
      <UserDrawer drawerClose={drawerClose} open={open} />
    </Header>
  );
};

export default Navbar;
