import CartContext from '../../context/CartContext'
import './index.css'

const getTotalCartPrice = cartList => {
  let total = 0

  cartList.map(eachItem => {
    total += eachItem.quantity * eachItem.price
  })

  return total
}

const CartSummary = () => (
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
          <button className="checkout-btn">Checkout</button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
