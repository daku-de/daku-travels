'use client';

import { HiOutlineSun as SunIcon, HiOutlineMoon as MoonIcon } from 'react-icons/hi';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import useSound from 'use-sound';
import React from 'react';

export default function ThemeSwitch({ className }: { className?: string }) {
    const [mounted, setMounted] = useState(false);
    const { systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;
    const tooltip = `Switch to ${currentTheme === 'light' ? 'Dark Mode' : 'Light Mode'}`;

    const [playSwitch] = useSound('/resources/theme-switch.mp3', { volume: 0.2 });

    const switchTheme = () => {
        playSwitch();
        if (currentTheme === 'dark') {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    };

    useEffect(() => setMounted(true), []);

    if (!mounted) return <>...</>;

    if (currentTheme === 'dark') {
        return (
            <Tooltip>
                <TooltipTrigger asChild className={cn('h-6 w-6 cursor-pointer', className)}>
                    <div>
                        <SunIcon onClick={switchTheme} className="h-full w-full" />
                        <span className="sr-only">{tooltip}</span>
                    </div>
                </TooltipTrigger>
                <TooltipContent side="right">{tooltip}</TooltipContent>
            </Tooltip>
        );
    }

    if (currentTheme === 'light') {
        return (
            <Tooltip>
                <TooltipTrigger asChild className={cn('h-6 w-6 cursor-pointer', className)}>
                    <div>
                        <MoonIcon onClick={switchTheme} className="h-full w-full" />
                        <span className="sr-only">{tooltip}</span>
                    </div>
                </TooltipTrigger>
                <TooltipContent side="right">{tooltip}</TooltipContent>
            </Tooltip>
        );
    }
}
