import { Link, LinkProps, useLocation } from 'react-router-dom'

export interface NavLinkProps extends LinkProps {}

export function NavLink(props: NavLinkProps) {
  const { pathname } = useLocation()

  return (
    <Link
      data-currentUrl={pathname === props.to}
      className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground data-[currentUrl=true]:border-b-2 data-[currentUrl=true]:border-muted-foreground data-[currentUrl=true]:text-foreground"
      {...props}
    />
  )
}
