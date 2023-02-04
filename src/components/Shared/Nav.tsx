import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../../firebase.init";
import useAdmin from "../../hooks/UseAdmin";
import useCart from "../../hooks/UseCart";

const Nav = () => {
  const [user, loading, error] = useAuthState(auth);
  // @ts-ignore

  const [admin] = useAdmin(user);

  const [cartItem] = useCart();

  let totalCost = 0;

  for (const loop of cartItem) {
    // @ts-ignore
    const price = loop?.products.price;
    // @ts-ignore
    const quantity = loop?.quantity;
    // @ts-ignore
    totalCost += parseInt(price * quantity);
  }

  const totalAmount = totalCost;

  //! sign out
  const handleSignOut = () => {
    signOut(auth);
    localStorage.removeItem("accessToken");
  };

  return (
    <div className="navbar bg-base-100 relative z-10">
      <div className="navbar-start ">
        <div className="dropdown ">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          {/* mobile */}
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {admin && (
              <li tabIndex={0}>
                <a>
                  Admin
                  <svg
                    className="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                  </svg>
                </a>
                <ul className="p-2 bg-white">
                  <li>
                    <Link to="/addproduct">Add Product</Link>
                  </li>
                  <li>
                    <Link to="/edit">Edit/Remove Product</Link>
                  </li>
                  <li>
                    <Link to="/order">Orders</Link>
                  </li>

                  <li>
                    <Link to="/users">Users</Link>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>

        <Link to="/" className="btn btn-ghost normal-case text-xl">
          Quick Cart
        </Link>
      </div>

      {/* desktop */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu  menu-horizontal px-1 ">
          {admin && (
            <li tabIndex={0}>
              <a>
                Admin
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </a>
              <ul className="p-2 bg-white">
                <li>
                  <Link to="/addproduct">Add Product</Link>
                </li>
                <li>
                  <Link to="/edit">Edit/Remove Product</Link>
                </li>
                <li>
                  <Link to="/order">Orders</Link>
                </li>

                <li>
                  <Link to="/users">Users</Link>
                </li>
              </ul>
            </li>
          )}
        </ul>
      </div>

      <div className="navbar-end">
        {/* cart */}
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">
                  {cartItem.length}
                </span>
              </div>
            </label>

            <div
              tabIndex={0}
              className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="font-bold text-lg">
                  {cartItem.length} Items
                </span>
                <span className="text-info">Subtotal: ৳{totalAmount}</span>
                {cartItem.length === 0 ? (
                  ""
                ) : (
                  <Link to="/cart" className="card-actions">
                    <button className="btn btn-primary btn-block">
                      View cart
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div />
        )}

        {/* profile */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              {user ? (
                // @ts-ignore
                <img src={user?.photoURL} />
              ) : (
                <img src="https://placeimg.com/80/80/people" />
              )}
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box "
          >
            <li>
              <h1>{user?.displayName}</h1>
            </li>
            <li>
              <h1>{user?.email}</h1>
            </li>
            {user ? (
              <button
                onClick={() => handleSignOut()}
                className="btn btn-primary text-white"
              >
                Sign out
              </button>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Nav;
