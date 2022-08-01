//Importing everything what it's needed. Bootstrap , react icons , logo
import { FaShoppingCart } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import {
  Badge,
  Button,
  Container,
  Dropdown,
  FormControl,
  Nav,
  Navbar,
} from "react-bootstrap";
import logo from "../img/logo.png"
import { Link, useLocation } from "react-router-dom";
import { CartState } from "../context/Context";
import "./styles.css";

const Header = () => {
  const {
    state: { cart },
    dispatch,
    productDispatch,
  } = CartState();
//Navbar Component from Bootstrap (Logo,Search , dropdown button)
  return (
    <Navbar bg="dark" variant="dark" style={{ height: 80 ,top:0,zIndex:2,position:"sticky"}}>     
      <Container>
        <Navbar.Brand>
        <a href="/" className="brand-name"><img className="logo" src={logo} alt="Logo"/>Abstract</a>
          <Link to="/" className="shopping-link">Shopping Cart</Link>
        </Navbar.Brand>
{/* Search Bar function*/}
        {useLocation().pathname.split("/")[1] !== "cart" && (
          <Navbar.Text className="search">
            <FormControl
              
              type="search"
              placeholder="Search a product..."
              className="m-auto"
              aria-label="Search"
              onChange={(e) => {
                productDispatch({
                  type: "FILTER_BY_SEARCH",
                  payload: e.target.value,
                });
              }}
            />
          </Navbar.Text>
        )}
{/* Dropdown Button */}
        <Nav>
          <Dropdown>
            <Dropdown.Toggle variant="success">
              <FaShoppingCart color="white" fontSize="25px" />
              <Badge>{cart.length}</Badge>
            </Dropdown.Toggle>
{/* Function which showing how many items in basket */}
            <Dropdown.Menu style={{ minWidth: 370 }}>
              {cart.length > 0 ? (
                <>
                  {cart.map((prod) => (
                    <span className="cart-item" key={prod.id}>
                      <img
                        src={prod.image}
                        className="cart-item-img"
                        alt={prod.name}
                      />
                      <div className="cart-item-detail">
                        <span>{prod.name}</span>
                        <span>{prod.price.split(".")[0]}$</span>
                      </div>
{/* Button delete item from basket */}
                      <AiFillDelete
                        fontSize="20px"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: prod,
                          })
                        }
                      />
                    </span>
                  ))}
                  <Link to="/cart">
                    <Button variant="success" style={{ width: "95%", margin: "10px" }}>
                      Go To Cart
                    </Button>
                  </Link>
                </>
              ) : (
                <span style={{ padding: 10 }}>Cart is Empty!</span>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;