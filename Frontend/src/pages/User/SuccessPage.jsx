import bgpayment from '../../assets/userbg.png';

export default function SuccessPage() {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: `url(${bgpayment})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        width: '100vw'
      }}
    >
      <div
        className="shadow-lg p-5 rounded text-center"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          maxWidth: '500px'
        }}
      >
        <h2 style={{ color: 'green', fontWeight: '700' }}>✅ Payment Successful</h2>
        <p style={{ fontSize: '1.2rem', color: 'black' }}>
          Your payment has been processed successfully.
        </p>
      </div>
    </div>
  );
}
