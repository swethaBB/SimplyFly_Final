export default function SeatSelector({ seats, selected, toggleSeat }) {
  return (
    <div className="row">
      {seats.map(seat => (
        <div key={seat.id} className="col-3 mb-2">
          <button
            className={`btn ${selected.includes(seat.seatNumber) ? 'btn-warning' : 'btn-outline-secondary'} w-100`}
            onClick={() => toggleSeat(seat.seatNumber)}
            disabled={seat.isBooked}
          >
            {seat.seatNumber} ({seat.seatClass})
          </button>
        </div>
      ))}
    </div>
  );
}
