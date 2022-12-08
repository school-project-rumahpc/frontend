import { Layout, Row, Col, Button, Spin } from 'antd'
import { Custom } from '../../utils/custom';
import { TokenUtil } from '../../utils/token';
import { http } from '../../utils/http';
import { useRouter } from 'next/router'
import {useState, useEffect} from 'react'

const { Header,Content } = Layout

const Unauthorized = ()=>{
   const router = useRouter()
   router.back()
   return(
   <Row justify='center'>
      <h1>Unauthorized! redirecting back...</h1>
   </Row>
   )
}

const logOut = () => {
    const router = useRouter()
    TokenUtil.clearAccessToken();
    TokenUtil.persistToken();
    router.push('/');
};
const Admin = () => {
   const {user, status} = useUser()
   console.log(user)
   if(status !== 'done' ) return <Spin/>
   if(user.role !== 'admin') return <Unauthorized/>
   if(!user)return 
	
   return( 
   <Layout style={{height:'100vh', maxHeight:'100%',backgroundColor:'#009867'}}>
      <Header style={{zIndex:'1'}}>
         <Row align='middle' justify='space-between' style={{padding:'0 20px',height:'100%'}}>
            <Col><h1>Admin Page</h1></Col>
            <Col><Button danger size='large' type='text' onClick={logOut}>Log Out</Button></Col>
         </Row>
      </Header>
      <Content style={Custom.contentStyle}>Say hello say hello say hello</Content>
   </Layout>)
};

export default Admin;

const useUser = () =>{
   const [status, setStatus] = useState('pending')
   const [user,setUser] = useState()
   useEffect(()=>{
      setStatus('pending')
      http.get('/auth/user')
         .then(({body})=>{
         setStatus('done')
         setUser(body)
      })
         .catch(({response})=>console.log(response.message))}
      ,[])
   return {user, status}
}