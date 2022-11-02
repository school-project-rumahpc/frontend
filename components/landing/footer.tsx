import { NextPage } from 'next';

interface Props {}

const Footer: NextPage<Props> = ({}) => {
  return (
    <footer style={{ position: 'absolute', bottom: 0 }}>
      <h5 style={{color: 'GrayText'}}>Copyright &#169; RumahPc 2022</h5>
    </footer>
  );
};

export default Footer;
