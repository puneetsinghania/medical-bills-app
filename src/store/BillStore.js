import { makeAutoObservable, runInAction } from 'mobx';
import firebase, { db } from '../firebase';
import 'firebase/firestore';
import 'firebase/storage';

class BillStore {
  bills = [];

  constructor() {
    makeAutoObservable(this);
    this.saveBill = this.saveBill.bind(this);
  }

  addBill(bill) {
    this.bills.push(bill);
  }

  setBills(bills) {
    this.bills = bills;
  }

  getBill(index) {
    return this.bills[index];
  }

  fetchBills(userId) {
  const unsubscribe = db.collection("bills")
    .where("userId", "==", userId)
    .onSnapshot(snapshot => {
      let bills = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Log the bills fetched from Firebase
      console.log("Bills fetched from Firebase:", bills);

      this.setBills(bills);
    });

  // Return the unsubscribe function
  return unsubscribe;
}





  async updateBillInFirebase(billId, updatedBill) {
  const { billImage, ...otherBillData } = updatedBill;

  let downloadURL = null;
  if (billImage) {
    try {
      const storageRef = firebase.storage().ref('bills/' + billImage.name);
      const uploadTask = storageRef.put(billImage);

      await uploadTask;

      downloadURL = await storageRef.getDownloadURL();
    } catch (error) {
      console.error('Error uploading bill image:', error);
    }
  }

  try {
    await db.collection('bills').doc(billId).update({
      ...otherBillData,
      billImage: downloadURL || otherBillData.billImage,
	  modificationDate: firebase.firestore.FieldValue.serverTimestamp(),
    });
    
    runInAction(() => {
      const index = this.bills.findIndex((bill) => bill.id === billId);
      if (index !== -1) {
        this.bills[index] = { ...updatedBill, id: billId, billImage: downloadURL || otherBillData.billImage };
      }
    });
  } catch (error) {
    console.error('Error updating bill:', error);
  }
}


  async saveBill(bill) {
  const { billImage, ...otherBillData } = bill;

  let downloadURL = null;
  if (billImage) {
    try {
      const storageRef = firebase.storage().ref('bills/' + billImage.name);
      const uploadTask = storageRef.put(billImage);

      await uploadTask;

      downloadURL = await storageRef.getDownloadURL();
    } catch (error) {
      console.error('Error uploading bill image:', error);
    }
  }

  try {
    let billRef;
    if (bill.id) {
      // Updating an existing bill
      billRef = db.collection('bills').doc(bill.id);
      await billRef.update(
        {
          ...otherBillData,
          billImage: downloadURL || otherBillData.billImage,
        }
      );
    } else {
      // Saving a new bill
      billRef = await db.collection('bills').add({
        ...otherBillData,
        billImage: downloadURL,
		modificationDate: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }

    const updatedBill = await billRef.get();
    
    runInAction(() => {
      const index = this.bills.findIndex((b) => b.id === billRef.id);
      if (index !== -1) {
        this.bills[index] = { ...updatedBill.data(), id: billRef.id };
      } else {
        this.bills.push({ ...updatedBill.data(), id: billRef.id });
      }
    });

    return billRef.id;
  } catch (error) {
    console.error('Error saving bill:', error);
  }
}

}

const billStore = new BillStore();
export default billStore;
