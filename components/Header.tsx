import Link from "next/link";
import Image from "next/image";

const Header = () => {
	return (
		<header>
			<div>
				<Link href="/">
					<a>
						<Image
							src="/images/logo.png"
							width={40}
							height={40}
							alt="logo"
						/>
						<span className="ml-3 tex-xl">DevSpace</span>
					</a>
				</Link>
				<nav>
					<Link href="/blog">
						<a>
							Blog
						</a>
					</Link>
					<Link href="/about">
						<a>
							About
						</a>
					</Link>
				</nav>
			</div>
		</header>
	);
};

export default Header;
