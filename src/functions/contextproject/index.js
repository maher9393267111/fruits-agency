import { createContext, useEffect, useState, useContext } from "react";
import { db, auth } from "../firebase";

import { toast } from "react-toastify";
import { useRouter } from "next/router";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
} from "firebase/auth";

import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

// import { useDispatch } from "react-redux";
// import { GetCurrentUser } from "../../redux/productSlice";
import { message } from "antd";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  // const dispatch = useDispatch();

  const [name, setName] = useState("zaher");
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(false);

  // step One for wishlist and cart
  const [wishList, setWishList] = useState([]);
  const [cart, setCart] = useState([]);

  const wishListSnapShot = async (userId) => {
    const docRef = doc(db, "wishlist", userId); //access the db folder name wishlist with userId
    // fetch data from document
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("wishlist is exist");
      setWishList(docSnap.data().wishList);
    }
  };

  const cartSnapShot = async (userId) => {
    const docRef = doc(db, "cart", userId); //
    // fetch data from document
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("cart is exist");
      setCart(docSnap.data().cart);
    }
  };

  // create wishlist and cart document when user has registered

  const createCollections = async (uid) => {
    const wishRef = doc(collection(db, "wishlist"), uid);
    const cartRef = doc(collection(db, "cart"), uid);
    try {
      await setDoc(wishRef, {
        wishList: [],
      });

      await setDoc(cartRef, {
        cart: [],
      });
    } catch (error) {}
  };

  // send product when click heart icon
  const addToWishList = async (item) => {
    // {product}

    try {
      if (profile) {
        // specefic user wishlist get
        const updateWishList = doc(db, "wishlist", profile?.uid);

        /// update current user wishlist and add new product to array

        await updateDoc(updateWishList, {
          wishList: arrayUnion({
            ...item,
          }),
        });
        console.log(updateWishList, "updatewishlistttttttttaddtowishlist");

        // add product  to  wishlist array state then checke if product exist or not in single product cart component
        setWishList((prev) => [...prev, item]);
        toast.info("product added to wishlist");
      } else {
        toast.error("Please Login Or Register");
      }
    } catch (error) {
      console.log(error?.message);
      toast.error(error);
    }
  };

  // remove red heart when clicked on single product
  const removeFromWishList = async (item) => {
    // {product}

    try {
      if (profile) {
        // specefic user wishlist get
        const updateWishList = doc(db, "wishlist", profile?.uid);

        /// update current user wishlist and add new product to array

        await updateDoc(updateWishList, {
          wishList: arrayRemove({
            ...item,
          }),
        });
        console.log(updateWishList, "updatewishlistttttttttremove");

        // remove from product single card the read heart

        const removeItem = wishList.filter((product) => product.id !== item.id);

        console.log("removeitemmm===>", removeItem);

        setWishList(removeItem);
        toast.info("product removed from wishlist");
      } else {
        toast.error("Please Login Or Register");
      }
    } catch (error) {
      console.log(error?.message);
      toast.error(error);
    }
  };

  // send product when click on addtocart icon
  const addToCart = async (item) => {
    // {product}

    try {
      if (profile) {
        //console.log("profileeee=>",profile)
        // specefic user cart get
        const updateCartList = doc(db, "cart", profile?.uid);

        // update current user cart and add new product to array

        await updateDoc(updateCartList, {
          cart: arrayUnion({
            ...item,
          }),
        });
        console.log(updateCartList,"updateAddToCartListttt")

        //add product  to  Cart array state then checke if product exist or not in single product cart component
        setCart((prev)=>[...prev ,item])
        toast.info("product added to Cart")  
        
      } else {
        toast.error("Please Login Or Register");
              }
            
             } catch (error) {
              console.log(error?.message);
              toast.error(error);
            }
            
          };
          

        // ------------------------------------  new item added addtoCart with Quantity ----------------------------------------

        // const updateCartList = doc(db, "cart", profile?.uid);
        // const isExist = cart.find((e) => e.id === item.id);

        // if (isExist === undefined) {
        //   const obj = { ...item, quantity: 1 };
        //   console.log("object added", obj);
        //   await updateDoc(updateCartList, {
        //     cart: arrayUnion({
        //       ...obj,
        //     }),
        //   });

        //   setCart((prev) => [...prev, obj]);
        //   toast.info("new item added");
        // }

        //// product is already exist in cart so increase product quantity
  //       else if (isExist !== undefined) {
  //         let obj = [...cart];

  //         for (let i = 0; i < obj.length; i++) {
  //           if (obj[i].id === item.id) {
  //             obj[i].quantity += 1;
  //           }
  //         }

  //         setCart(obj);

  //         await setDoc(updateCartList, {
  //           cart: cart,
  //         });

  //         toast.info("item is exist increase quantity");
  //       }
  //     } else {
  //       toast.error("Please Login Or Register");
  //     }
  //   } catch (error) {
  //     console.log(error?.message);
  //     toast.error(error);
  //   }
  // };



    // remove addtocart when clicked on single product
    // const removeFromCartList = async (item) => {
    //   // {product}
  
    //   try {
    //     if (profile) {
    //       // specefic user addtocart get
    //          const updateCartList = doc(db, "cart", profile?.uid);
  
    //       //   /// update current user cart and add new product to array
  
    //         await updateDoc(updateCartList, {
    //           cart: arrayRemove({
    //             ...item,
    //           }),
    //         });
    //          console.log(updateCartList,"updateCartlisttttttttt  remove")
  
    //       //   // remove from product single card the AddtoCart
  
    //          const removeItem  = cart.filter((product) =>
    //          product.id !== item.id
  
    //        );
  
    //        console.log("removeitemmm===>addtoCart",removeItem)
  
    //          setCart(removeItem)
    //          toast.info("product removed from AddtoCart")
  
          // ---------------------------------------------------------------
  
      


  // remove from cart when clicked on single product
  const removeFromCartList = async (item) => {
    // {product}

    try {
      if (profile) {
        // specefic user wishlist get
        const updateCartList = doc(db, "cart", profile?.uid);

        /// update current user cart and add new product to array

        await updateDoc(updateCartList, {
          cart: arrayRemove({
            ...item,
          }),
        });
        console.log(updateCartList, "updateCartListttt");

        // remove product from cart

        const removeItem = cart.filter((product) => product.id !== item.id);

        console.log("removeitemmm===>", removeItem);

        setCart(removeItem);
        toast.success("product removed from cart");



        } else {
          toast.error("Please Login Or Register");
        }
      } catch (error) {
        console.log(error?.message);
        toast.error(error);
      }
    };




  // remove addtocart when clicked on single product
  // const removeFromCartList2 = async (item) => {
    // {product}

    // try {
    //   if (profile) {
        // specefic user addtocart get
        //   const updateCartList = doc(db, "cart", profile?.uid);

        //   /// update current user cart and add new product to array

        //   await updateDoc(updateCartList, {
        //     cart: arrayRemove({
        //       ...item,
        //     }),
        //   });
        //   console.log(updateCartList,"updateCartlisttttttttt  remove")

        //   // remove from product single card the AddtoCart

        //   const removeItem  = cart.filter((product) =>
        //   product.id !== item.id

        // );

        // console.log("removeitemmm===>addtoCart",removeItem)

        //   setCart(removeItem)
        //   toast.info("product removed from AddtoCart")

        // ---------------------------------------------------------------

  //       const updateCartList = doc(db, "cart", profile?.uid);

  //       const isExist = cart.find((e) => e.id === item.id);

  //       console.log("EXIST--->", isExist);
  //       if (isExist === undefined) {
  //         toast.info("item not found to remove");
  //       } else if (isExist.quantity === 1) {
  //         let obj = [...cart];
  //         // !== this item i don't want to include it in my list array
  //         const filterItem = obj.filter((e) => e.id !== item.id);
  //         setCart(obj);

  //         await updateDoc(updateCartList, {
  //           cart: arrayRemove({
  //             ...item,
  //           }),
  //         });

  //         // await setDoc(updateCartList, {
  //         //   cart: cart,
  //         // });

  //         toast.info("item removed successfully");
  //       } else if (isExist.quantity > 1) {
  //         let obj = [...cart];

  //         for (let i = 0; i < obj.length; i++) {
  //           if (obj[i].id === item.id) {
  //             obj[i].quantity -= 1;
  //           }
  //         }

  //         setCart(obj);

  //         await setDoc(updateCartList, {
  //           cart: cart,
  //         });

  //         toast.info("item is exist decrease quantity");
  //       }
  //     } else {
  //       toast.error("Please Login Or Register");
  //     }
  //   } catch (error) {
  //     console.log(error?.message);
  //     toast.error(error);
  //   }
  // };




  const register = (
    email,
    password,
    firstName,
    lastName,
    imageAsset,
    imageId
  ) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        setPageLoading(true);
        //after saving data stop spinner
        console.log("response:===>", res);

        // verification Link send to user Email
        // await promise me to do this function successfully
        await sendEmailVerification(auth.currentUser);

        const userRef = doc(collection(db, "users"), res.user?.uid);

        await setDoc(userRef, {
          uid: res.user?.uid,
          email: email,
          displayName: `${firstName} ${lastName}`,
          password: password,
          imageAsset: imageAsset,
          imageId: imageId,
          role: "admin",
        });

        createCollections(res.user?.uid);

        setPageLoading(false);
        // while loading data from firebase start spinner

        toast.success("User added successfully");
        toast.warning(
          "please verify your email ,check your inbox or junk Email"
        );
        router.push("/");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const signInUser = async (email, password) => {
    try {
      setPageLoading(true);
      //response of user data
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log("user===>", userCredential.user.emailVerified);
      // if (userCredential.user.emailVerified === false) {

      //   setPageLoading(false);
      //   toast.error("please verify your email")

      //   return
      // }

      setPageLoading(false);
      toast.success("successfully signed in");

      router.push("/");
    } catch (error) {
      toast.error(error?.message);
      setPageLoading(false);
      console.log(error?.message);
    }
  };

  const forgetPassword = async (email) => {
    try {
      setPageLoading(true);
      await sendPasswordResetEmail(auth, email);
      setPageLoading(false);

      toast.success(
        "successfully password reseted password sent successfully to your email"
      );
      router.push("/auth/login");
    } catch (error) {
      toast.error("error reset your Email not found");
    }
  };

  const [userData, setUserData] = useState(null);

  const [profile, setProfile] = useState(null);
  console.log(profile, "profileee");

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      console.log("user Auth Data--->", user);
      // if auth user is  already maked register or Login
      // find his profile data from firebase/firetore
      setPageLoading(true);
      if (user) {
        // set Authuser data in state
        setUserData(user);
        localStorage.setItem("isLogged", true);
        // specify path for get Auth user Data from firestore
        const userRef = doc(db, "users", user?.uid);
        wishListSnapShot(user?.uid);
        cartSnapShot(user?.uid);
        console.log("wishlist==>", wishList);
        console.log("carttt==>", cart);
        const docSnap = await getDoc(userRef);

        // if AuthUser have data in firestore set his data in setProfile
        if (docSnap.exists()) {
          console.log("firstore Data of user--->", docSnap.data());
          setProfile(docSnap.data());
          // dispatch(GetCurrentUser(docSnap.data()));
        }
      }

      setPageLoading(false);
    });
  }, []);

  const logout = () => {
    signOut(auth);
    setProfile(null);
    setPageLoading(false);
    router.push("/");
  };

  const [inputt, setInputt] = useState();

  return (
    <StateContext.Provider
      value={{
        name,
        register,
        signInUser,
        forgetPassword,
        pageLoading,
        profile,
        userData,
        logout,
        setPageLoading,
        setName,
        inputt,
        setInputt,
        wishList,
        setWishList,
        cart,
        setCart,
        addToWishList,
        removeFromWishList,
        addToCart,
        removeFromCartList,
        logout,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(StateContext);
  return context;
};
