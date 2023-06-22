import React from "react";
import { observer } from "mobx-react-lite";
import billStore from "../store/BillStore";
import { useNavigate, useParams } from "react-router-dom";

const SummaryPage = observer(() => {
  const { billId } = useParams();
  const currentBill = billStore.bills.find(bill => bill.id === billId);

  const navigate = useNavigate(); // hook to navigate
  
  if (billStore.bills.length === 0) {
    return <div>Loading...</div>;
  }

  if (!currentBill) {
    return <div>No bill information available</div>;
  }

  const handleEdit = () => {
    navigate(`/add-bill/${billId}`);
  };

  return (
    <div>
      <h1>Summary Page</h1>
      <div>
        <strong>Patient Name:</strong> {currentBill.patientName}
      </div>
      <div>
        <strong>Address:</strong> {currentBill.address}
      </div>
      <div>
        <strong>Hospital Name:</strong> {currentBill.hospitalName}
      </div>
      <div>
        <strong>Date of Service:</strong> {currentBill.serviceDate}
      </div>
      <div>
        <strong>Bill Amount:</strong> {currentBill.billAmount}
      </div>
      {currentBill.billImage && (
    <div>
        <strong>Bill Image:</strong>
        <img src={currentBill.billImage} alt="Bill" style={{ maxWidth: '300px' }} />
    </div>
)}


      {/* Button to Edit Bill */}
      <button onClick={handleEdit}>Edit Bill</button>
    </div>
  );
});

export default SummaryPage;