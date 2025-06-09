"use client";

import * as React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import AccountBtn from "../buttons/AccountButton";
import { ThemeToggleBtn } from "../buttons/ThemeToggleBtn";
import { useRouter } from "next/navigation";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    description:
      "Stay organized and track your progress. Monitor study hours, view achievements, and plan your study sessions efficiently.",
  },
  {
    title: "Study",
    href: "/dashboard/study",
    description:
      "Access study materials, set personalized study plans, and engage with a community of learners for a more productive study session.",
  },
  {
    title: "Stats",
    href: "/dashboard/stats",
    description:
      "Track study hours, set goals, and analyze your performance over time.",
  },
  {
    title: "Leaderboard",
    href: "/dashboard/leaderboard",
    description:
      "Check your ranking and compete with others. Stay motivated and climb the leaderboard by achieving your study goals.",
  },
  {
    title: "Groups",
    href: "/dashboard/groups",
    description:
      "Join or create study groups. Collaborate with others, participate in group activities, and enhance your learning journey together.",
  },
  {
    title: "Friends",
    href: "/dashboard/friends",
    description:
      "Connect with friends, build a network of study buddies, and share achievements in a collaborative learning atmosphere.",
  },
];

export default function MainHeader() {
  const router = useRouter();

  return (
    <header className="fixed z-10 backdrop-blur-sm w-screen px-16 flex items-center justify-between h-15">
      <div className="invisible md:visible">
        <Link href={"/"} >
          <h1 className="text-3xl font-bold">FLOZABLE</h1>
        </Link>
      </div>
      <NavigationMenu className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/#about" legacyBehavior passHref>
              <NavigationMenuLink className={cn(navigationMenuTriggerStyle())}>
                About
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/#features" legacyBehavior passHref>
              <NavigationMenuLink className={cn(navigationMenuTriggerStyle())}>
                Features
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/#reviews" legacyBehavior passHref>
              <NavigationMenuLink className={cn(navigationMenuTriggerStyle())}>
                Reviews
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          {/* <NavigationMenuItem>
            <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        shadcn/ui
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Beautifully designed components that you can copy and
                        paste into your apps. Accessible. Customizable. Open
                        Source.
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/docs" title="Introduction">
                  Re-usable components built using Radix UI and Tailwind CSS.
                </ListItem>
                <ListItem href="/docs/installation" title="Installation">
                  How to install dependencies and structure your app.
                </ListItem>
                <ListItem href="/docs/primitives/typography" title="Typography">
                  Styles for headings, paragraphs, lists...etc
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem> */}
          <NavigationMenuItem>
            <NavigationMenuTrigger
              onClick={() => {
                router.push("/dashboard");
              }}
            >
              Dashboard
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex gap-2 justify-center invisible md:visible">
        <AccountBtn />
        <ThemeToggleBtn />
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ComponentRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
