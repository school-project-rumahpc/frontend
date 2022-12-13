import {
  Button,
  Col,
  Divider,
  message,
  Modal,
  Row,
  Statistic,
  Upload,
  Image,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Err, Loading } from "../../components/loadingAndErr";
import { useStore } from "../../components/storeContext";
import { statusColor } from "../../utils/custom";
import { formatPrice } from "../../utils/priceFormat";
import { http } from "../../utils/http";
import { getBase64 } from "../../utils/fileReader";

// proof of payment
const POP = ({ checkoutDetails }) => {
  const { id } = checkoutDetails;
  const { checkoutStore } = useStore();
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("order_id", id);
    formData.append("image", image);
    setUploading(true);
    http
      .post("/order/upload", formData)
      .then(({ body }) => {
        message.success(body.message);
      })
      .catch(({ response }) => {
        message.error(response.body);
      })
      .finally(() => {
        checkoutStore.loadCheckoutDetails(id);
        setUploading(false);
      });
  };

  const handlePreUpload = (file) => {
    setImage(file);
    return false;
  };

  return (
    <>
      <Row justify={"center"} style={{ width: "100%" }}>
        <Col style={{ width: "100%" }}>
          {image && (
            <a
              onClick={() =>
                image
                  .arrayBuffer()
                  .then((res) =>
                    setPreview(
                      Buffer.from(new Uint8Array(res)).toString("base64")
                    )
                  )
              }
            >
              Show preview
            </a>
          )}
          <Upload
            onRemove={() => {
              setImage(null);
              setPreview(null);
            }}
            accept="image/*"
            beforeUpload={handlePreUpload}
            listType="list"
            onPreview={false}
          >
            {!image && (
              <Button icon={<UploadOutlined />} type="text">
                Upload
              </Button>
            )}
          </Upload>
        </Col>
      </Row>
      {preview && (
        <Row>
          <Image src={`data:image/*;base64,${preview}`} preview={false} />
        </Row>
      )}
      <Row justify={"center"} style={{ margin: "20px 0" }}>
        <Button
          disabled={!image}
          loading={uploading}
          type="primary"
          onClick={handleSubmit}
          block
        >
          Submit
        </Button>
      </Row>
    </>
  );
};

const ItemsDisplay = ({ items }) => {
  return items.map(({ id, quantity, item, subTotal }) => {
    return (
      <Row
        key={id}
        style={{ width: "600px", textAlign: "end" }}
        justify="space-between"
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
  const { deadline, status, items, totalPrice, image } = checkoutDetails;
  console.log(image);
  return (
    <>
      {deadline && (
        <Row justify={"center"}>
          <h3 style={{ color: "#FF2F2F" }}>{deadline}</h3>
          <Divider />
        </Row>
      )}
      <Row justify={"space-between"}>
        <Col>
          <h2>Status :</h2>
        </Col>
        <Col>
          <h2 style={{ color: statusColor(status) }}>{status}</h2>
        </Col>
        <Divider />
      </Row>
      <Row align={"middle"} justify="space-between">
        <Col>
          <h2>Items</h2>
        </Col>
        <Col>
          <ItemsDisplay items={items} />
        </Col>
        <Divider />
      </Row>
      <Row justify={"space-between"}>
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
      {image ? (
        <Row justify={"center"} style={{ margin: "20px 0 40px" }}>
          <Image
            preview={false}
            placeholder={<Loading />}
            style={{
              border: "2px solid #009867",
              borderRadius: "20px",
            }}
            src={image}
            width={500}
            height="100%"
          />
        </Row>
      ) : (
        <POP checkoutDetails={checkoutDetails} />
      )}
    </>
  );
};

const OrderDetails = () => {
  const { checkoutDetails, status } = useCheckOutDetails();
  if (status === "error") return <Err />;
  return (
    <Row
      justify={"center"}
      style={{
        backgroundColor: "#009867",
        minHeight: "100vh",
        maxHeight: "100%",
      }}
    >
      <Col
        style={{
          color: "grey",
          padding: "0 30px",
          boxShadow: "0 0 100px rgba(0, 0, 0, 0.25)",
          borderRadius: "25px",
          margin: "40px 0",
          backgroundColor: "#fff",
          width: "60vw",
        }}
      >
        <Row align={"middle"}>
          <Divider orientation="left" style={{ borderColor: "#009867" }}>
            <h1>Order Details</h1>
          </Divider>
        </Row>
        {status === "successDetails" ? (
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
    }
  }, [router.isReady]);
  return checkoutStore;
};
