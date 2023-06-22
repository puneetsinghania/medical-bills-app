import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BillForm from "../components/BillForm";
import billStore from "../store/BillStore";

const BillFormPage = () => {
  const navigate = useNavigate();
  const { billIndex: billIndexParam } = useParams();
  const billIndex = parseInt(billIndexParam, 10); // Convert to number
  const isEditing = !isNaN(billIndex); // Check if billIndex is a number
  
  const currentBill = isEditing ? billStore.getBill(billIndex) : null;
  const currentBillId = currentBill ? currentBill.id : null;
  
  const [initialValues, setInitialValues] = useState({
    patientName: "",
    address: "",
    hospitalName: "",
    serviceDate: "",
    billAmount: "",
    billImage: null,
  });

  useEffect(() => {
    if (isEditing && currentBill) {
      setInitialValues(currentBill);
    }
  }, [isEditing, currentBill]);

  const handleFormSubmit = async (formData) => {
  if (isEditing) {
    formData.id = currentBillId;
    await billStore.updateBillInFirebase(currentBillId, formData);
    navigate(`/summary/${currentBillId}`);
  } else {
    const newBillId = await billStore.saveBill(formData);
    navigate(`/summary/${newBillId}`);
  }
};



  return (
    <div>
      <h1>{isEditing ? "Edit Bill" : "Add a Bill"}</h1>
      <BillForm initialValues={initialValues} onSubmit={handleFormSubmit} />
    </div>
  );
};

export default BillFormPage;