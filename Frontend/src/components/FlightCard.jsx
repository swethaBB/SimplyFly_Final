export default function FlightCard({ flight, onSelect }) {
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'SCHEDULED':
        return 'bg-success';
      case 'DELAYED':
        return 'bg-warning text-dark';
      case 'CANCELLED':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5>{flight.flightName} ({flight.flightNumber})</h5>
        <p>From: {flight.route.origin} → To: {flight.route.destination}</p>

        <p>
          Status: <span className={`badge ${getStatusBadgeClass(flight.status)}`}>
            {flight.status}
          </span>
        </p>

        <button
          className="btn btn-primary"
          onClick={() => onSelect(flight.id)}
          disabled={flight.status === 'CANCELLED'}
        >
          {flight.status === 'CANCELLED' ? 'Unavailable' : 'Select Seats'}
        </button>
      </div>
    </div>
  );
}
