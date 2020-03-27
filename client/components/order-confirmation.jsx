import React from 'react';
import { useFilterDuplicates, useGetItemCount } from './custom-hooks';

const OrderConfirmation = ({ setView, customer, orderItems, total }) => {
  const [cartInfo] = useFilterDuplicates(orderItems);
  const [itemCount] = useGetItemCount(orderItems);

  return (
    <section className="container w-80 rounded order-confirm-container">
      <div className="row confirm-header my-3">
        <div className="col-12">
          <h3 className="display-3 text-center">Thank you for your order!</h3>
        </div>
      </div>

      <div className="row confirm-subtext">
        <div className="col-12">
          <p className="text-center">This is a demo site so no order will be processed </p>
        </div>
      </div>

      <div className="row order-number mt-5">
        <div className="col">
          <h4 className="display-4">Order: #{ customer.orderId }</h4>
        </div>
      </div>

      <div className="row order-details mt-5">
        <div className="col">
          <table className="order-table table p-3">
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              {
                cartInfo.map(item => {
                  const { multiplier } = itemCount[item.productId];
                  return (
                    <tr key={ item.cartItemId }>
                      <td>{ item.name }</td>
                      <td className="font-italic">x{ multiplier }</td>
                      <td>${ (multiplier * item.price / 100).toFixed(2) }</td>
                    </tr>
                  );
                }
                )
              }
              <tr>
                <th colSpan="2">Cart Total:</th>
                <td>{ total }</td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>

      <div className="row">
        <div className="col text-right p-3">
          <button className="btn btn-dark" onClick={ () => setView('checkout', {})}>Done</button>
        </div>
      </div>
    </section>
  );
};

export default OrderConfirmation;
