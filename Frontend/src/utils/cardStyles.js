
export const cardStyle = (imagePath) => ({
  width: '280px',
  height: '160px',
  backgroundImage: `url(${imagePath})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
  transition: 'transform 0.2s ease',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  padding: '16px',
  color: 'white',
  cursor: 'pointer',
});
