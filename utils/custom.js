export const Custom = {
  validateMSG: {
    //custom validate message
    required: 'Please fill in the ${label}',
    types: { email: '${label} invalid!' },
    pattern: {
      mismatch: 'Invalid ${label}',
    },
  },
  contentStyle: {
    boxShadow: ' 0px 0 50px 30px rgba(0, 0, 0, 0.25)',
    margin: '0 100px',
    backgroundColor: '#fff',
  },
  loadingGif: {
    backgroundImage: 'url(/loading.gif)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: '70px',
  },
};
export const statusColor = (status) => {
  switch (status) {
    case 'Waiting':
    case 'OnQueue':
      return '#221E1F';
    case 'Pending':
      return '#C3963F';
    case 'Fail':
      return '#FF2F2F';
    default:
      return '#009867';
  }
};
