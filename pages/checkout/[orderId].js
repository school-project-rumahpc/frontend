import { Button, Col, Divider, message, Modal, Row, Statistic, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Err, Loading } from '../../components/loadingAndErr';
import { useStore } from '../../components/storeContext';
import { statusColor } from '../../utils/custom';
import { formatPrice } from '../../utils/priceFormat';
import { http } from '../../utils/http';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
// proof of payment
const POP = () => {
  const [uploading, setUploading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [image, setImage] = useState(null);

  //FIXME: POST TO BACKEND
  const handleSubmit = () => {
    setUploading(true)
    http.post('/order/upload',image)
    .then(res=>{
      console.log(res)
      message.success()
    })
    .catch(({response})=>{
      console.log(response)
      message.error()
    })
    setUploading(false)
  };
  const hadnlePreUpload = (file) => {
    setImage(file);
    return false;
  };
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    );
  };
  return (
    <>
      <Row justify={'center'}>
        <Upload
          style={{ width: 'fitContent', padding: '0' }}
          onRemove={() => setImage(null)}
          accept='image/*'
          beforeUpload={hadnlePreUpload}
          listType='picture'
          onPreview={handlePreview}
        >
          {!image ? (
            <Button icon={<UploadOutlined />} type='text'>
              Upload
            </Button>
          ) : null}
        </Upload>
      </Row>
      <Row justify={'center'} style={{ margin: '50px 0' }}>
        <Button
          disabled={!image}
          loading={uploading}
          type='primary'
          onClick={handleSubmit}
          block
        >
          Submit
        </Button>
      </Row>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt='photo' style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

const ItemsDisplay = ({ items }) => {
  return items.map(({ id, quantity, item, subTotal }) => {
    return (
      <Row
        key={id}
        style={{ width: '600px', textAlign: 'end' }}
        justify='space-between'
      >
        <Col span={15}>
          <h3>{item.name}</h3>
        </Col>
        <Col span={3}>
          <h3>{quantity}x</h3>
        </Col>
        <Col span={6}>
          <h4>{formatPrice(subTotal)}</h4>
        </Col>
      </Row>
    );
  });
};

const OrderDetailsDisplay = ({ checkoutDetails }) => {
  const { deadline, status, items, totalPrice } = checkoutDetails;
  return (
    <>
      {deadline && (
        <Row justify={'center'}>
          <h3 style={{ color: '#FF2F2F' }}>{deadline}</h3>
          <Divider />
        </Row>
      )}
      <Row justify={'space-between'}>
        <Col>
          <h2>Status :</h2>
        </Col>
        <Col>
          <h2 style={{ color: statusColor(status) }}>{status}</h2>
        </Col>
        <Divider />
      </Row>
      <Row align={'middle'} justify='space-between'>
        <Col>
          <h2>Items</h2>
        </Col>
        <Col>
          <ItemsDisplay items={items} />
        </Col>
        <Divider />
      </Row>
      <Row justify={'space-between'}>
        <Col>
          <h2>Total</h2>
          <sup>please pay the exact amount displayed**</sup>
        </Col>
        <Col>
          <h1>{formatPrice(totalPrice)}</h1>
        </Col>
        <Divider />
      </Row>
      <Row>
        <h2>Proof Of Payment</h2>
      </Row>
      <POP />
    </>
  );
};

const OrderDetails = () => {
  const { checkoutDetails, status } = useCheckOutDetails();
  if (status === 'error') return <Err />;
  return (
    <Row
      justify={'center'}
      style={{
        backgroundColor: '#009867',
        minHeight: '100vh',
        maxHeight: '100%',
      }}
    >
      <Col
        style={{
          color: 'grey',
          padding: '0 30px',
          boxShadow: '0 0 100px rgba(0, 0, 0, 0.25)',
          borderRadius: '25px',
          margin: '40px 0',
          backgroundColor: '#fff',
          width: '60vw',
        }}
      >
        <Row align={'middle'}>
          <Divider orientation='left' style={{ borderColor: '#009867' }}>
            <h1>Order Details</h1>
          </Divider>
        </Row>
        {status === 'successDetails' ? (
          <OrderDetailsDisplay checkoutDetails={checkoutDetails} />
        ) : (
          <Loading />
        )}
      </Col>
    </Row>
  );
};

export default observer(OrderDetails);

const useCheckOutDetails = () => {
  const { checkoutStore } = useStore();
  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
      checkoutStore.loadCheckoutDetails(router.query.orderId);
      console.log(checkoutStore);
    }
  }, [router.isReady]);
  return checkoutStore;
};
