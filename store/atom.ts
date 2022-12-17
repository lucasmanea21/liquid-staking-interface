import { atom } from 'jotai';

export const exchangeRateAtom = atom(1);
export const egldValueAtom = atom('0');
export const stEgldValueAtom = atom('0');
export const unstakeEgldValueAtom = atom('0');
export const isStakeSelectedAtom = atom(true);

export const currentEpochAtom = atom(0);
