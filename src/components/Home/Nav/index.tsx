import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface navLinksType {
    navLinks: {
        href: string,
        name: string
    }[]
}

const HomeHeaderNav = ({ navLinks }: navLinksType) => {
    const pathname = usePathname()
    return(
        <nav className="nav">
            {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                    <Link
                        className={isActive ? 'text-blue' : 'text-black'}
                        href={link.href}
                        key={link.name}
                    >
                        {link.name}
                    </Link>
                )
            })}
        </nav>
    )
}

export default HomeHeaderNav;