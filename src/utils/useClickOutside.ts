import React, { useEffect } from 'react';

type EventsTuple = [DocumentEventMap['mousedown']['type'], DocumentEventMap['touchstart']['type']];
const events: EventsTuple = ['mousedown', 'touchstart'];

const useClickOutside = (ref: React.RefObject<HTMLDivElement>, onClickOutside: () => void) => {
    const isOutside = (element: EventTarget | null) => {
        return element != null && (!ref.current || !ref.current?.contains(element as HTMLElement));
    };

    const onClick = (event: Event) => {
        if (isOutside(event.target)) {
            onClickOutside();
        }
    };

    useEffect(() => {
        for (const event of events) {
            document.addEventListener(event as keyof DocumentEventMap, onClick);
        }

        return () => {
            for (const event of events) {
                document.removeEventListener(event, onClick);
            }
        };
    });
};

export default useClickOutside;
