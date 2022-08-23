import {
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    query,
    where
  } from "firebase/firestore";
  
  export const firestoreFetch = async (categoryId) => {
    let q;
    const db = getFirestore();
  
    if (categoryId) {
      q = query(collection(db, "Products"), where("category", "==", categoryId));
    } else {
      q = query(collection(db, "Products"));
    }
    const querySnapshot = await getDocs(q);
    const dataFromFirestore = querySnapshot.docs.map((document) => ({
      id: document.id,
      ...document.data(),
    }));
    return dataFromFirestore;
  };
//   useEffect(() => {
//     const querydb = getFirestore();
//     const queryCollection = collection(querydb, "Products");
//     if (categoryId) {
//         const queryFilter = query(
//             queryCollection,
//             where("category", "==", categoryId),
//         );
//         getDocs(queryFilter).then((res) =>
//             setData(
//                 res.docs.map((product) => ({ id: product.id, ...product.data() })),
//             ),
//         );
//     } else {
//         getDocs(queryCollection).then((res) =>
//             setData(
//                 res.docs.map((product) => ({ id: product.id, ...product.data() })),
//             ),
//         );
//     }
// }, [categoryId]);
  export const firestoreFetchOne = async (idItem) => {
    const db = getFirestore();
    const docRef = doc(db, "Products", idItem);
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      let result = {
        id: idItem,
        ...docSnap.data(),
      };
      return result;
    } else {
      console.log("No such document!");
    }
  };
  