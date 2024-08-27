import * as React from 'react';

import { cn } from '@/lib/utils';

const VerticalTimeline = ({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) => {
    return (
        <div className={cn('overflow-x-hidden h-fit p-2 pt-0 pl-4 min-w-10 w-[470px]', className)}>
            <div className={cn('min-h-28 relative py-10 flex flex-col gap-10 max-w-full', className)} {...props}>
                <div className="absolute h-full w-2 bg-primary top-2 bottom-0 rounded-sm">
                    <div className="absolute top-0 w-full h-4 rounded-sm bg-inherit rotate-45 origin-top-right"></div>
                    <div className="absolute top-0 w-full h-4 rounded-sm bg-inherit -rotate-45 origin-top-left"></div>
                </div>
                {children}
            </div>
        </div>
    );
};
VerticalTimeline.displayName = 'VerticalTimeline';

export { VerticalTimeline };
