import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import billStore from "../store/BillStore";
import firebase from "../firebase";

const BillList = observer(() => {

  useEffect(() => {
    const user = firebase.auth().currentUser;
	
    let unsubscribe;

    if (user) {
      // Use fetchBills method to get bills from Firebase and update the store
      unsubscribe = billStore.fetchBills(user.uid);
    }

    // Clean up subscription
    return () => {
      if (unsubscribe) unsubscribe();
    };
	
  }, []); // Depend on empty array to run once when component mounts

  return (
    <div>
      <h2>Bill List</h2>
      <ul>
        {billStore.bills.map((bill, index) => (
          <li key={bill.id}>
            <h3>{bill.patientName}</h3>
            <p>Address: {bill.address}</p>
            <p>Hospital: {bill.hospitalName}</p>
            <p>Date of service: {bill.serviceDate}</p>
            <p>Bill Amount: ${bill.billAmount}</p>
            {bill.billImage && (
              <div>
                <strong>Bill Image:</strong>
                <img
                  src={bill.billImage}
                  alt="Bill"
                  style={{ maxWidth: "200px", marginBottom: "10px" }}
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default BillList;