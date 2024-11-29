import {clsx, type ClassValue} from "clsx"
import {twMerge} from "tailwind-merge"
import Sqids from "sqids";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function encodeId(id: number): string {
    const sqids = new Sqids({
        alphabet: 'FxnXM1kBN6cuhsAvjW3Co7l2RePyY8DwaU04Tzt9fHQrqSVKdpimLGIJOgb5ZE',
    });
    return sqids.encode([id]);
}

export function decodeId(id: string): number {
    const sqids = new Sqids({
        alphabet: 'FxnXM1kBN6cuhsAvjW3Co7l2RePyY8DwaU04Tzt9fHQrqSVKdpimLGIJOgb5ZE',
    });
    return sqids.decode(id)[0];
}