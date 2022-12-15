import {
  Button,
  Col,
  Divider,
  message,
  Row,
  Statistic,
  Upload,
  Image,
  Spin,
} from "antd";
import { UploadOutlined, LoadingOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Err, Loading } from "../../components/loadingAndErr";
import { useStore } from "../../components/storeContext";
import { statusColor } from "../../utils/custom";
import { formatPrice } from "../../utils/priceFormat";
import { http } from "../../utils/http";

// proof of payment
const POP = ({ checkoutDetails }) => {
  const router = useRouter();
  const { id, status } = checkoutDetails;
  const { checkoutStore } = useStore();
  const [action, setAction] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const handleCancel = () => {
    setAction(true);
    http
      .del("/order/cancel")
      .send({ order_id: id })
      .then(({ body }) => {
        message.success(body.message);
        router.push("/checkout");
      })
      .catch(({ response }) => {
        message.error(response.body.message);
      })
      .finally(() => {
        checkoutStore.loadCheckoutDetails(id);
        setAction(false);
      });
  };
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("order_id", id);
    formData.append("image", image);
    setAction(true);
    http
      .post("/order/upload", formData)
      .then(({ body }) => {
        message.success(body.message);
      })
      .catch(() => {
        message.error("File must be under 10 MB");
      })
      .finally(() => {
        checkoutStore.loadCheckoutDetails(id);
        setAction(false);
      });
  };

  const handlePreUpload = (file) => {
    setImage(file);
    return false;
  };
  return (
    <>
      {checkoutDetails.image ? (
        <Row justify={"center"} style={{ margin: "20px 0" }}>
          <Image
            preview={false}
            placeholder={<Spin />}
            style={{ borderRadius: "20px" }}
            src={checkoutDetails.image}
            height="100%"
          />
        </Row>
      ) : (
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
          <Row justify={"center"} style={{ margin: "20px 0", gap: "20px 0" }}>
            <Button
              block
              disabled={!image}
              loading={action}
              type="primary"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Row>
          {preview && (
            <Row justify="center">
              <Image
                style={{ borderRadius: "20px", marginBottom: '20px',minHeight:'40px' }}
                placeholder={<LoadingOutlined/>}
                src={`data:image/*;base64,${preview}`}
                preview={false}
              />
            </Row>
          )}
        </>
      )}
      {status != "Finished" && (
        <Button
          danger
          block
          loading={action}
          onClick={handleCancel}
          style={{ marginBottom: "40px" }}
        >
          Cancel order
        </Button>
      )}
    </>
  );
};

const ItemsDisplay = ({ items }) => {
  return items.map(({ id, quantity, item, subTotal }) => {
    return (
      <Row
        style={{ textAlign: "end" }}
        key={id}
        gutter={[30]}
        justify="space-between"
      >
        <Col flex={"auto"}>
          <h3>{item.name}</h3>
        </Col>
        <Col>
          <h3>{quantity}x</h3>
        </Col>
        <Col>
          <h4>{formatPrice(subTotal)}</h4>
        </Col>
      </Row>
    );
  });
};

const OrderDetailsDisplay = ({ checkoutDetails }) => {
  const { deadline, status, items, totalPrice, image } = checkoutDetails;
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
          <h2>Status</h2>
        </Col>
        <Col>
          <h2 style={{ color: statusColor(status) }}>{status}</h2>
        </Col>
        <Divider />
      </Row>
      <Row align={"middle"} justify="space-between">
        <Col flex={"auto"}>
          <h2>Items</h2>
        </Col>
        <Col flex={"auto"}>
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
      <POP checkoutDetails={checkoutDetails} />
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
