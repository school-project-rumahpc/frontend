import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { useState } from 'react';

const GeneratePDF = ({ pdfToGenerate }) => {
  const [status, setStatus] = useState();
  const generatePDF = async () => {
    setStatus('pending');
    const image = await toPng(pdfToGenerate.current,{canvasWidth:1050, backgroundColor:'transparent'});
    const doc = new jsPDF({ unit: 'cm'});

    doc.addImage(image, 'JPEG', 0, 0, 21, 29.7);
    doc.save('test');
  };

  return (
    <Button
      style={{
        position: 'sticky',
        top: '10px',
        zIndex: '1',
        left: 'calc(100% - 55px)',
      }}
      shape='circle'
      icon={<DownloadOutlined />}
      loading={status == 'pending'}
      onClick={() => generatePDF().finally(() => setStatus('done'))}
    />
  );
};

export default GeneratePDF;
