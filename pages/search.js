import { useRouter } from "next/router";
import { useEffect } from "react";
import {http} from '../utils/http'
import {Card,Layout, Row, Col} from 'antd'
import Navbar from '../components/bar/navbar';
import { Err, Loading } from "../components/loadingAndErr";
import styles from "../styles/product.module.css";
import Image from "next/image";
import { Custom } from "../utils/custom";
import {useState} from 'react'
const {Content} = Layout

const Search = () => {
  const router = useRouter();
  const [data, setData] = useState()
  useEffect(() => {
    if (!router.isReady) return;
    const res = http.search(router.query.s)
    res
      .then(res=>setData(res.body))
      .catch(()=>setData(null))
    console.log(router.query.s)
  }, [router.isReady,router.query.s]);
    
 if (data === null){
     return <Err />
 }
  return(
  <div>
      <Layout style={{minHeight:'100vh',maxHeight:'100%'}}>
      <Navbar/>
        <Content style={{padding:'25px 30px'}}>
      <Row align='middle' gutter={[25,25]}>
      {data?
      data.map(item=>{
       console.log(item)
       return(
           <Col key={item.id}>
        <Card
        className={styles["ant-card"]}
        hoverable
        onClick={() => router.push(`/catalog/${item.category.category_name}/${item.id}`)}
        cover={
              <Image
                style={Custom.loadingGif}
                src={item.images[0]}
                alt={item.name}
                width={250}
                height={280}
                loading="lazy"
                title={item.name}
              />
            }
        ></Card>
        </Col>
        )}
    ):<Loading />}
    </Row>
        </Content>
      </Layout>
  </div>)
};

export default Search;
