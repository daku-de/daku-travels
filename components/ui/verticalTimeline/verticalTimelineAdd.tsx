import * as React from 'react';

import { Plus } from 'lucide-react';

interface VerticalTimelineItemProps extends React.HTMLAttributes<HTMLElement> {
    onClick: () => void;
}

const VerticalTimelineAddItem = ({ onClick }: VerticalTimelineItemProps) => {
    return (
        <div className={'relative pl-10 text-primary-foreground'}>
            <div
                className={`absolute top-2 -mt-[2px] left-1 bg-muted rounded-lg w-8 h-8 border-primary border-4 -translate-x-1/2 p-1 text-primary cursor-pointer`}
                onClick={onClick}
            >
                <Plus className="w-full h-full stroke-[5]" />
            </div>
            <div
                className="h-[1.1em] max-w-[95%] w-fit box-content bg-primary relative rounded-xl p-3 px-5 flex justify-center flex-col shadow-md border border-primary-foreground cursor-pointer"
                onClick={onClick}
            >
                <div className="h-0 w-0 absolute top-1/2 left-0 -translate-x-full border-[12px] border-transparent border-solid border-r-primary border-l-0 -translate-y-1/2"></div>

                <div className="font-black select-none">ADD ITEM</div>
            </div>
        </div>
    );
};
VerticalTimelineAddItem.displayName = 'VerticalTimelineAddItem';

export { VerticalTimelineAddItem };
