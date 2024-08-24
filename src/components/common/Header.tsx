import Link from "next/link"
import { FiSearch } from "react-icons/fi"

const Header = () => {
  return (
    <div className="flex justify-between items-center">
      <Link href="/">
        <a className="text-2xl font-bold">jngmnj</a>
      </Link>
      <div>
        <Link href="/about">
          <a className="mr-4">About</a>
        </Link>
        <Link href="/contact">
          <a>Contact</a>
        </Link>
      </div>
      <div>
        <button type="button" className="mr-4">
          <FiSearch />
        </button>
        <Link href="/login">
          <a className="mr-4">Login</a>
        </Link>
      </div>

    </div>
  )
}

export default Header
