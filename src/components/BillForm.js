import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import FileUploader from "./FileUploader";
import { db, storage } from "../firebase";
import firebase from "../firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

const validationSchema = Yup.object({
  patientName: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  hospitalName: Yup.string().required("Required"),
  serviceDate: Yup.date().required("Required"),
  billAmount: Yup.number().positive().required("Required"),
});

const BillForm = ({ initialValues, onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const user = firebase.auth().currentUser;
      if (user) {
        try {
          let imageUrl = null;
          if (values.billImage) {
            const storageRef = storage.ref(`billImages/${values.billImage.name}`);
            await storageRef.put(values.billImage);
            imageUrl = await storageRef.getDownloadURL();
          }
          if (initialValues.id) {
            // Update existing document
            await db.collection("bills").doc(initialValues.id).set({
              ...values,
              billImage: imageUrl,
              userId: user.uid,
            });
          } else {
            // Add a new document
            await db.collection("bills").add({
              ...values,
              billImage: imageUrl,
              userId: user.uid,
            });
          }
        } catch (error) {
          console.error("Error adding/updating bill: ", error);
        }
      }
      if (onSubmit) {
        onSubmit(values);
      }
      setSubmitting(false);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {/* Patient Name */}
      <div>
        <label htmlFor="patientName">Patient Name</label>
        <input
          id="patientName"
          type="text"
          {...formik.getFieldProps("patientName")}
        />
        {formik.touched.patientName && formik.errors.patientName ? (
          <div>{formik.errors.patientName}</div>
        ) : null}
      </div>

      {/* Address */}
      <div>
        <label htmlFor="address">Address</label>
        <input
          id="address"
          type="text"
          {...formik.getFieldProps("address")}
        />
        {formik.touched.address && formik.errors.address ? (
          <div>{formik.errors.address}</div>
        ) : null}
      </div>

      {/* Hospital Name */}
      <div>
        <label htmlFor="hospitalName">Hospital Name</label>
        <input
          id="hospitalName"
          type="text"
          {...formik.getFieldProps("hospitalName")}
        />
        {formik.touched.hospitalName && formik.errors.hospitalName ? (
          <div>{formik.errors.hospitalName}</div>
        ) : null}
      </div>

      {/* Service Date */}
      <div>
        <label htmlFor="serviceDate">Date of Service</label>
        <input
          id="serviceDate"
          type="date"
          {...formik.getFieldProps("serviceDate")}
        />
        {formik.touched.serviceDate && formik.errors.serviceDate ? (
          <div>{formik.errors.serviceDate}</div>
        ) : null}
      </div>

      {/* Bill Amount */}
      <div>
        <label htmlFor="billAmount">Bill Amount</label>
        <input
          id="billAmount"
          type="number"
          {...formik.getFieldProps("billAmount")}
        />
        {formik.touched.billAmount && formik.errors.billAmount ? (
          <div>{formik.errors.billAmount}</div>
        ) : null}
      </div>

      <div>
  <label htmlFor="billImage">
    <FontAwesomeIcon icon={faUpload} className="upload-icon" />
    Bill Image
  </label>
  <FileUploader onFileUpload={(file) => formik.setFieldValue("billImage", file)} />
</div>

      {/* Submit Button */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default BillForm;