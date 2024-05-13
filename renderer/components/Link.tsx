import MuiLink, { LinkProps as MuiLinkProps } from "@mui/material/Link";
import { styled } from "@mui/material/styles";
import clsx from "clsx";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { forwardRef } from "react";

// Add support for the sx prop for consistency with the other branches.
const Anchor = styled("a")({});

/**
 * Props for the NextLinkComposed component.
 */
interface NextLinkComposedProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">,
    Omit<
      NextLinkProps,
      "href" | "as" | "passHref" | "onMouseEnter" | "onClick" | "onTouchStart"
    > {
  to: NextLinkProps["href"];
  linkAs?: NextLinkProps["as"];
}

/**
 * A composed link component that wraps the NextLink component.
 * @example
 * ```tsx
 * <NextLinkComposed to="/about" prefetch>
 *   About
 * </NextLinkComposed>
 * ```
 * @returns The JSX element representing the composed link.
 */
export const NextLinkComposed = React.forwardRef<
  HTMLAnchorElement,
  NextLinkComposedProps
>(function NextLinkComposed(props, ref) {
  const {
    to,
    linkAs,
    replace,
    scroll,
    shallow,
    prefetch,
    legacyBehavior = true,
    locale,
    ...other
  } = props;

  return (
    <NextLink
      href={to}
      prefetch={prefetch}
      as={linkAs}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref
      locale={locale}
      legacyBehavior={legacyBehavior}
    >
      <Anchor ref={ref} {...other} />
    </NextLink>
  );
});

/**
 * Props for the Link component.
 *
 */
export type LinkProps = {
  activeClassName?: string;
  as?: NextLinkProps["as"];
  href: NextLinkProps["href"];
  linkAs?: NextLinkProps["as"]; // Useful when the as prop is shallow by styled().
  noLinkStyle?: boolean;
} & Omit<NextLinkComposedProps, "to" | "linkAs" | "href"> &
  Omit<MuiLinkProps, "href">;

/**
 * A custom link component that wraps Next.js Link and MUI Link.
 * @example
 * ```tsx
 * <Link href="/about">About</Link>
 * ```
 * @returns The JSX element representing the link.
 */
const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  function Link(props, ref) {
    const {
      activeClassName = "active",
      as,
      className: classNameProps,
      href,
      legacyBehavior,
      linkAs: linkAsProp,
      locale,
      noLinkStyle,
      prefetch,
      replace,
      role,
      scroll,
      shallow,
      ...other
    } = props;

    const router = useRouter();
    const pathname = typeof href === "string" ? href : href.pathname;
    const className = clsx(classNameProps, {
      [activeClassName]: router.pathname === pathname && activeClassName,
    });

    const linkAs = linkAsProp || as;
    const nextjsProps = {
      to: href,
      linkAs,
      replace,
      scroll,
      shallow,
      prefetch,
      legacyBehavior,
      locale,
    };

    if (noLinkStyle) {
      return (
        <NextLinkComposed
          className={className}
          ref={ref}
          {...nextjsProps}
          {...other}
        />
      );
    }

    return (
      <MuiLink
        component={NextLinkComposed}
        className={className}
        ref={ref}
        {...nextjsProps}
        {...other}
      />
    );
  },
);

export default Link;
