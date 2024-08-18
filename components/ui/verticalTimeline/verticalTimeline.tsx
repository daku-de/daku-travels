import * as React from 'react';

import { cn } from '@/lib/utils';

const VerticalTimeline = ({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) => {
    return (
        <div className="overflow-hidden p-2 pl-4 max-w-fit min-w-10">
            <div className={cn('min-h-28 relative py-10 flex flex-col gap-10 max-w-full', className)} {...props}>
                <div className="absolute h-full w-2 bg-primary top-2 rounded-sm">
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
