"use client";

import { useTheme } from "next-themes";

import { Moon, Sun } from "lucide-react";

import { Button } from "@/modules/shared/ui";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const changeTheme = () => {
    if (theme === "dark") setTheme("light");
    else setTheme("dark");
  };

  return (
    <Button className='cursor-pointer w-full gap-2' onClick={changeTheme}>
      Change theme
      <Sun className='transition-all dark:hidden' />
      <Moon className='hidden transition-all dark:inline-block' />
    </Button>
  );
}
