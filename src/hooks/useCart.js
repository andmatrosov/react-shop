import { useContext } from "react"
import AppContext from "../context"

export const useCart = () => {
	const { cartItems, setCartItems } = useContext(AppContext)
	const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);

	const totalPriceFormated = (percent = 1, fixed = 0) => {
		return (totalPrice * percent)
			.toFixed(fixed)
			.toString()
			.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
	}

	return { cartItems, setCartItems, totalPrice, totalPriceFormated }
}

