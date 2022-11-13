import { Col, Drawer, Input, Row } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Styles from '../../styles/header.module.css';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  //Drawer trigger
  const showDrawer = () => {
    setOpen(true);
  };
  const drawerClose = () => {
    setOpen(false);
  };

  //TODO: search handler
  const onSearch = (value) => {
    console.log(value);
  };

  return (
    <>
      <Row justify='space-between' align='middle' style={{ height: '100px' }}>
        <Col className={Styles.logo}>
          <Link href={'/catalog'}>
            <a>
              <Image
                src={'/logo.svg'}
                width={121}
                height={84}
                alt='Logo'
                priority
              />
            </a>
          </Link>
        </Col>
        <Col style={{ margin: 'auto' }}>
          <Input.Search
            style={{ width: '350px' }}
            onSearch={onSearch}
            allowClear
          />
        </Col>
        <Col>
          <div className={Styles.icon}>
            <Link href={'/our-retail'}>
              <a>
                <Image src={'/store.svg'} width={35} height={35} priority />
              </a>
            </Link>
          </div>
        </Col>
        <Col>
          <div className={Styles.icon}>
            <Link href={'/catalog'}>
              <a>
                <Image src={'/cart.svg'} width={35} height={35} priority />
              </a>
            </Link>
          </div>
        </Col>
        <Col>
          <div className={Styles.user}>
            <div id={Styles[1]}></div>
            <div id={Styles[2]}></div>
            <div id={Styles[3]}></div>
            <div>
              <a onClick={showDrawer}>
                <Image
                  src={'/account.svg'}
                  width={40}
                  height={40}
                  alt='Cart'
                  priority
                />
              </a>
            </div>
          </div>
        </Col>
      </Row>
      <Drawer placement='right' onClose={drawerClose} open={open}>
        <p>My some content</p>
      </Drawer>
    </>
  );
};

export default Navbar;
