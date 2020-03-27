import React from 'react';
import { useFilterDuplicates, useGetItemCount } from './custom-hooks';

const OrderConfirmation = ({ setView, customer, orderItems, total }) => {
  const [cartInfo] = useFilterDuplicates(orderItems);
  const [itemCount] = useGetItemCount(orderItems);

  return (
    <section className="container w-50 rounded order-confirm-container">
      <div className="row confirm-header my-3">
        <div className="col-12">
          <h1 className="text-center">Thank you for your order!</h1>
        </div>
      </div>

      <div className="row confirm-subtext">
        <div className="col-12">
          <p className="text-center">This is a demo site so no order will be processed </p>
        </div>
      </div>

      <div className="row order-number mt-5">
        <div className="col">
          <h2>Order: #{ customer.orderId }</h2>
        </div>
      </div>

      <div className="row product-details mt-5">
        <div className="col">
          <h3>Order Details</h3>
        </div>
      </div>
      <div className="row order-details">
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
                      <td className="font-italic">${ (multiplier * item.price / 100).toFixed(2) }</td>
                    </tr>
                  );
                }
                )
              }
              <tr>
                <th colSpan="2">Purchase Total:</th>
                <td>${ (total / 100).toFixed(2) }</td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>

      <div className="row customer-details mt-5">
        <div className="col">
          <h3>Customer Details</h3>
        </div>
      </div>
      <div className="row customer-info">
        <div className="col">
          <table className="table-sm w-50">
            <tbody>
              <tr>
                <th scope="row">Name:</th>
                <td>{ customer.name }</td>
              </tr>
              <tr>
                <th scope="row">Address:</th>
                <td>{ customer.shippingAddress }</td>
              </tr>
              <tr>
                <th scope="row">Credit Card:</th>
                <td>Number ending with { customer.creditCard.slice(12) }</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="row">
        <div className="col text-right p-3">
          <button className="btn btn-dark" onClick={ () => setView('catalog', {})}>Done</button>
        </div>
      </div>
    </section>
  );
};

export default OrderConfirmation;
