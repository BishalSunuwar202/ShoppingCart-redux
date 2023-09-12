import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { Fragment, useEffect } from "react";
import Notification from "./components/UI/Notification";
import { sendCartData } from "./store/cart-slice";

//it is created outside of component function for not to reinitize while rerender
//it is also used to solve a problem which is
//at first fetch, empty cart will be sent to backend, which can be seen in network
//so we will not sent data at first initilization but sent after first
let isInitial = true;

function App() {
  const dispatch = useDispatch();

  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    // const sendCartData = async () => {

    // dispatch(
    //   uiActions.showNotification({
    //     status: "pending",
    //     title: "sending",
    //     message: "Sending cart data!",
    //   })
    // );
    // const response = await fetch(
    //   "https://food-delivery-redux-default-rtdb.firebaseio.com/cart.json",
    //   {
    //     method: "PUT",
    //     body: JSON.stringify(cart),
    //   }
    // );
    // if (!response.ok) {
    //   throw new Error("Sending cart data failed");
    //
    // }

    // dispatch(
    //   uiActions.showNotification({
    //     status: "success",
    //     title: "Success",
    //     message: "Sending cart data successfully!",
    //   })
    // );

    // const responseData = await response.json();
    // };

    if (isInitial) {
      isInitial = false;
      return;
    }

    dispatch(sendCartData(cart));
    // sendCartData().catch((error) => {
    // dispatch(
    //   uiActions.showNotification({
    //     status: "error",
    //     title: "Error",
    //     message: "Error Sending cart data!",
    //   })
    // );
    // });
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
