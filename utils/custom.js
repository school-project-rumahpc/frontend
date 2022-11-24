export const Custom = {
  validateMSG: {
    //custom validate message
    required: 'Please fill in the ${label}',
    types: { email: '${label} invalid!' },
    pattern: {
      mismatch: 'Invalid ${label}',
    },
  },
  contentStyle:{
    boxShadow: ' 0px 0 50px 30px rgba(0, 0, 0, 0.25)',
    margin: '0 100px',
    height: '100%',
    backgroundColor: '#fff',
  }
};