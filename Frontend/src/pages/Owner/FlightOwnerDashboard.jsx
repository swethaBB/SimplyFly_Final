import { useNavigate } from 'react-router-dom';
import { useRole } from '../../context/RoleContext';
import flightownerbg from '../../assets/flightownerbg.png';

export default function FlightOwnerDashboard() {
  const role = useRole();
  const navigate = useNavigate();

  if (role !== 'FLIGHT_OWNER') return <div>Access Denied</div>;

  const cards = [
    {
      title: 'Create Flight',
      description: 'Add new flights with timing and seat details.',
      buttonText: 'Create Flight',
      buttonColor: 'success',
      onClick: () => navigate('/own-create-flight')
    },
    {
      title: 'Manage My Flights',
      description: 'Update flight schedules and status.',
      buttonText: 'Manage Flights',
      buttonColor: 'primary',
      onClick: () => navigate('/own-manage-flights')
    }
  ];

  return (
    <div
      style={{
        backgroundImage: `url(${flightownerbg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        width: '100vw',
        overflowY: 'auto'
      }}
    >
       <div className="d-flex justify-content-end p-3">
        <button
          className="btn btn-outline-light"
          onClick={() => navigate('/login')}
        >
          🔓 Logout
        </button>
      </div>
      {/* Top Section with Title */}
      <div className="d-flex justify-content-center align-items-center" style={{ height: '40vh' }}>
        <h2 className="text-white text-center" style={{ fontWeight: '600', fontSize: '2.5rem' }}>
          Flight Owner Dashboard
        </h2>
      </div>

      {/* Cards Section */}
      <div className="container text-white" style={{ maxWidth: '1000px', marginTop: '90px' }}>
        <div className="row g-4">
          {cards.map((card, idx) => (
            <div key={idx} className="col-md-6">
              <div className="card bg-transparent border-light text-white h-100 p-4">
                <h4 className="mb-2">{card.title}</h4>
                <p>{card.description}</p>
                <button
                  className={`btn btn-${card.buttonColor} mt-2`}
                  onClick={card.onClick}
                >
                  {card.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Message */}
        <div className="text-center text-light mt-5" style={{ opacity: 0.6 }}>
          Logged in as: Flight Owner | Role-based access enabled
        </div>
      </div>
    </div>
  );
}
