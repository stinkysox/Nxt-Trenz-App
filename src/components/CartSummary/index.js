import {useState} from 'react'
import Popup from 'reactjs-popup'
import CartContext from '../../context/CartContext'
import './index.css'

const getTotalCartPrice = cartList => {
  let total = 0

  cartList.forEach(eachItem => {
    total += eachItem.quantity * eachItem.price
  })

  return total
}

const CartSummary = () => {
  const [paymentOption, setPaymentOption] = useState('')
  const [isorderClicked, setOrderStatus] = useState(false)

  const onOptionSelect = event => {
    const {value} = event.target
    setPaymentOption(value)
  }

  const onOrderClick = () => {
    console.log('Hello')
    setOrderStatus(true)
  }

  const onCloseClick = () => {
    setPaymentOption('')
    setOrderStatus(false)
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const cartLength = cartList.length

        return (
          <div className="summary-container">
            <div className="summary-price-section">
              <h1 className="order-total">Order Total:</h1>
              <p className="style-span">RS {getTotalCartPrice(cartList)}/-</p>
            </div>
            <p>{cartLength} Items in cart</p>
            <ReactPopUp
              onOptionSelect={onOptionSelect}
              paymentOption={paymentOption}
              cartList={cartList}
              isorderClicked={isorderClicked}
              onOrderClick={onOrderClick}
              onCloseClick={onCloseClick}
            />
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}

const ReactPopUp = ({
  onOptionSelect,
  paymentOption,
  cartList,
  isorderClicked,
  onOrderClick,
  onCloseClick,
}) => (
  <div className="popup-container">
    <Popup
      modal
      closeOnDocumentClick={false}
      closeOnEscape={false}
      trigger={
        <button type="button" className="checkout-btn">
          Checkout
        </button>
      }
    >
      {close => (
        <>
          <div className="pop-container-bg">
            <h2>Select Payment Method:</h2>
            <form onChange={onOptionSelect}>
              <div>
                <label className="label">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Card"
                    disabled
                  />
                  Card
                </label>
              </div>

              <div>
                <label className="label">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Net Banking"
                    disabled
                  />
                  Net Banking
                </label>
              </div>
              <div>
                <label className="label">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="UPI"
                    disabled
                  />
                  UPI
                </label>
                <br />
                <label className="label">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Wallet"
                    disabled
                  />
                  Wallet
                </label>
              </div>
              <div>
                <label className="label">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Cash on Delivery"
                  />
                  Cash on Delivery
                </label>
              </div>
            </form>
            <div>
              <p>Total:{getTotalCartPrice(cartList)}</p>
              <p>Total Items: {cartList.length}</p>
            </div>
            <div className="summary-btn-container">
              <button
                type="button"
                className="close-btn"
                onClick={() => {
                  close()
                  onCloseClick()
                }}
              >
                Close
              </button>

              <button
                type="button"
                disabled={paymentOption !== 'Cash on Delivery'}
                className={
                  paymentOption === 'Cash on Delivery' ? 'confirm-btn' : ''
                }
                onClick={onOrderClick}
              >
                Confirm Order
              </button>
            </div>
            {isorderClicked && (
              <p className="order-successfull">
                Your order has been placed successfully
              </p>
            )}
          </div>
        </>
      )}
    </Popup>
  </div>
)

export default CartSummary
