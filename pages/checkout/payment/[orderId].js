import Image from 'next/image';
import { Col, Layout, Row, Spin, Table } from 'antd';
import dynamic from 'next/dynamic';
import React from 'react';
import { useCheckOutDetails } from '../[orderId]';
import { observer } from 'mobx-react-lite';
import { Err } from '../../../components/loadingAndErr';
import { formatPrice } from '../../../utils/priceFormat';
const GeneratePDF = dynamic(() => import('../../../components/generatePDF'), {
  ssr: false,
});

const Payment = () => {
  const { checkoutDetails, status } = useCheckOutDetails();
  console.log({ checkoutDetails, status });
  const pdfToGenerate = React.createRef();
  const columns = ['Items', 'QTY', 'Price', 'Subtotal'];
  const columnsProp = columns.map((e) => {
    return {
      key: e,
      dataIndex: e,
      title: e,
      align: 'center',
      render: (text) => <h1 style={{ color: 'black' }}>{text}</h1>,
    };
  });

  const data = {
    key: checkoutDetails?.id,
    Items: checkoutDetails?.items.map(({ item }) => item.name),
    QTY: checkoutDetails?.items.map(({ quantity }) => quantity),
    Price: checkoutDetails?.items.map(({ item }) => formatPrice(item.price)),
    Subtotal: checkoutDetails?.items.map(({ subTotal }) =>
      formatPrice(subTotal)
    ),
  };
  console.log({ columnsProp, data });

  if (status == 'pending') return <Spin />;
  if (status == 'error') return <Err />;
  if (checkoutDetails.status != 'Finished')
    return <h1>Payment isn&#39;t completed</h1>;

  return (
    <main
      style={{
        minWidth: '21cm',
        minHeight: '29.7cm',
        padding: '30px 0',
        backgroundColor: '#009867',
      }}
    >
      <GeneratePDF pdfToGenerate={pdfToGenerate} />
      <Row justify={'center'} style={{ marginTop: '30px' }}>
        {/* PDF line code start */}
        <section
          ref={pdfToGenerate}
          style={{ width: '21cm', height: '29.7cm', backgroundColor: 'white' }}
        >
          <Layout style={{ height: '100%', backgroundColor: 'transparent' }}>
            <Layout.Content style={{ height: '100%' }}>
              <Row
                style={{ padding: '60px 50px 0 45px' }}
                justify='space-between'
              >
                <Col>
                  <Image
                    src={'/logo.svg'}
                    width={121}
                    height={84}
                    alt='Logo'
                    priority
                  />
                </Col>
                <Col>
                  <Col style={{ textAlign: 'end' }}>
                    <h1>
                      <b>Receipt</b>
                    </h1>
                    <h4>
                      Order Date - {checkoutDetails.orderDate.slice(0, 10)}
                    </h4>
                    <h4>
                      Order Id - <i>{checkoutDetails.id}</i>
                    </h4>
                  </Col>
                  <Col style={{ textAlign: 'end', marginTop: '20px' }}>
                    <h2>
                      <b>User Information</b>
                    </h2>
                    <h3>{checkoutDetails.user.username}</h3>
                    <h4>{checkoutDetails.user.email}</h4>
                    <h4>{checkoutDetails.user.phone}</h4>
                  </Col>
                </Col>
              </Row>
              {/* Tables */}
              <Table
                columns={columnsProp}
                style={{ margin: '20px 50px' }}
                dataSource={[data]}
                pagination={false}
              />
            </Layout.Content>
            <Layout.Footer style={{ padding: '5px 50px' }}>
              <Row justify={'space-between'}>
                <Col>
                  <h4>Customer Service</h4>
                  <h5>+62 8712-3212-321</h5>
                </Col>
                <Col>
                  <h4>Email</h4>
                  <h5>rumahPcHelp@gmail.com</h5>
                </Col>
              </Row>
            </Layout.Footer>
          </Layout>
        </section>
        {/* PDF end */}
      </Row>
    </main>
  );
};

export default observer(Payment);
